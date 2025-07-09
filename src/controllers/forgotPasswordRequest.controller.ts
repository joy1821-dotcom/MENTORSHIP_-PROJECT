import { RequestHandler } from "express";
import { Mentor, Mentee } from "../models/u-index.js";
import { generateResetToken } from "../secure/generateEmailToken.js";
import { sendPasswordResetEmail } from "../services/emailForPassword.js";

export const forgotPasswordRequest: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
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


    if (user && userType) {
      const { resetToken, resetTokenHash, resetTokenExpires } =
        generateResetToken();

      if (userType === "mentor") {
        await Mentor.update(
          { resetTokenHash, resetTokenExpires },
          { where: { email } }
        );
      } else {
        await Mentee.update(
          { resetTokenHash, resetTokenExpires },
          { where: { email } }
        );
      }

      await sendPasswordResetEmail({
        to: email,
        resetToken,
      });
    }


    res.json({
      success: true,
      message:
        "If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Error generating password reset token", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
