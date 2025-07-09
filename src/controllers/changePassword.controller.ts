import { RequestHandler } from "express";
import { Mentor, Mentee } from "../models/u-index.js";

export const changePassword: RequestHandler = async (req, res): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { id, role } = req.user;
    const { newPassword, confirmPassword } = req.body;

    if (!(newPassword || confirmPassword)) {
        res.json(400).json({ message: "All fields are required" });
        return
    }

      if (confirmPassword !== newPassword) {
        res.json(400).json({ message: "Password does not match" });
        return
      }

    if (!role || !id) {
      res.status(403).json({ message: "Role not authorized to edit profile" });
      return;
    }

    if (role === "mentor") {
      await Mentor.update({ password: newPassword }, { where: { id } });
      return;
    }

    if (role === "mentee") {
      await Mentee.update({ password: newPassword }, { where: { id } });
      return;
    }
    res.json({ success: true, message: "Password updated" });
  } catch (error) {
    console.error("Error in updating user password", error)
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
