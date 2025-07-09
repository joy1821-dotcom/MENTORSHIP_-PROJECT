import nodemailer from "nodemailer";
import dotenv, { config } from "dotenv";

dotenv.config()

const webUrl = process.env.BASE_URL

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendPasswordResetEmail({
  to,
  resetToken,
}: {
  to: string;
  resetToken: string;
}) {
  const resetLink = `${webUrl}reset-password?token=${resetToken}`;

  const info = await transporter.sendMail({
    from: `"Mentor App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nThis link will expire in 1 hour.`,
    html: `
        <p>You requested a password reset.</p>
        <p><a href="${resetLink}">Click here to reset your password</a></p>
        <p>This link will expire in 1 hour.</p>
      `,
  });

  console.log("Password reset email sent:", info.messageId);
}
