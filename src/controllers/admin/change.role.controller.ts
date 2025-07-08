import { Mentor, Mentee } from "../../models/u-index.js";
import { RequestHandler } from "express";

export const changeRole: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const { newRole, currentRole } = req.body;

  if (!userId || !newRole || !currentRole) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }

  if (
    !["mentor", "mentee"].includes(newRole) ||
    !["mentor", "mentee"].includes(currentRole)
  ) {
    res.status(400).json({ message: "Invalid role provided" });
    return;
  }

  if (newRole === currentRole) {
    res
      .status(400)
      .json({ message: "New role must be different from current role" });
    return;
  }

  try {
    let userData;

    if (currentRole === "mentor") {
      const mentor = await Mentor.findByPk(userId);
      if (!mentor) {
        res.status(404).json({ message: "Mentor not found" });
        return;
      }

      userData = {
        id: mentor.id,
        firstName: mentor.firstName,
        email: mentor.email,
        role: newRole,
      };
      await Mentor.destroy({ where: { id: userId } });
      res
        .status(200)
        .json({ message: "Role changed successfully to mentee", userData });
      return;
    }

    if (currentRole === "mentee") {
      const mentee = await Mentee.findByPk(userId);
      if (!mentee) {
        res.status(404).json({ message: "Mentee not found" });
        return;
      }

      userData = {
        id: mentee.id,
        firstName: mentee.firstName,
        email: mentee.email,
        role: newRole,
      };
      await Mentee.destroy({ where: { id: userId } });
      res
        .status(200)
        .json({ message: "Role changed successfully to mentor", userData });
      return;
    }
  } catch (error) {
    console.error("Error changing user role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
