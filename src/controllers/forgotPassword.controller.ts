import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { Mentor, Mentee } from "../models/u-index.js";

export const forgotPassword: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (newPassword !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

   
    let user: Mentor | Mentee | null = await Mentor.findOne({
      where: { email },
    });
    let userType: "mentor" | "mentee" | null = null;

    if (user) {
      userType = "mentor";
    } else {
      user = await Mentee.findOne({ where: { email } });
      if (user) {
        userType = "mentee";
      }
    }

    if (!user || !userType) {
      res.status(404).json({ message: "User with that email not found" });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (userType === "mentor") {
      await Mentor.update({ password: hashedPassword }, { where: { email } });
    } else if (userType === "mentee") {
      await Mentee.update({ password: hashedPassword }, { where: { email } });
    }

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
