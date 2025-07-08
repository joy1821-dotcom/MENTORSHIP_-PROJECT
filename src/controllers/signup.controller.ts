import { RequestHandler } from "express";
import { Mentor, Mentee } from "../models/u-index.js";

export const signup: RequestHandler = async (req, res) => {
  try {
    const { email, password, confirmPassword, role } = req.body;

    if (!email || !password || !confirmPassword || !role) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

    const existingUser =
      role === "mentor"
        ? await Mentor.findOne({ where: { email } })
        : role === "mentee"
        ? await Mentee.findOne({ where: { email } })
        : null;

    if (existingUser) {
      res.status(409).json({ message: "Email already in use" });
      return;
    }

    const newUser =
      role === "mentor"
        ? await Mentor.create({ email, password })
        : role === "mentee"
        ? await Mentee.create({ email, password })
        : null;

    if (!newUser) {
      res.status(400).json({ message: "Invalid role specified" });
      return;
    }

    res.status(201).json({
      success: true,
      message: `${role} account created successfully`,
      user: {
        id:newUser.id,
        email: newUser.email,
        role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
