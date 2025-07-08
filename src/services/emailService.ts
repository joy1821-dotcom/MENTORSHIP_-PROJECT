// utils/emailService.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendSessionReminderEmail({
  to,
  mentorName,
  sessionDate,
  startTime,
  menteeTimeZone,
}: {
  to: string;
  mentorName: string;
  sessionDate: string;
  startTime: string;
  menteeTimeZone: string;
}) {
  const info = await transporter.sendMail({
    from: `"Mentor App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Session Booked Successfully",
    text: `You've booked a session with ${mentorName} on ${sessionDate} at ${startTime} (${menteeTimeZone})`,
  });

  console.log("Booking email sent:", info.messageId);
}
