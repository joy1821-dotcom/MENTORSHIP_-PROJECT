import { RequestHandler } from "express";
import { Mentor, Mentee } from "../models/u-index.js";

export const editProfile: RequestHandler = async (req, res): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { id, role } = req.user;
    const { profileDetails } = req.body;

    if (!role || !id) {
      res.status(403).json({ message: "Role not authorized to edit profile" });
      return;
    }

    if (role === "mentor") {
      await Mentor.update(profileDetails, { where: { id } });
      return;
    }

    if (role === "mentee") {
      await Mentee.update(profileDetails, { where: { id } });
      return;
    }
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.error("Error in updating user profile", error)
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
