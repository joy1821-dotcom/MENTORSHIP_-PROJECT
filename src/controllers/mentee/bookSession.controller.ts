import {
  SessionBooking,
  Mentee,
  TimeSlot,
  MentorshipRequest,
  Mentor
} from "../../models/u-index.js";
import { RequestHandler } from "express";
import { sendSessionReminderEmail } from "../../services/emailService.js";


export const bookSession: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthenticated user." });
      return;
    }

    const menteeId = req.user.id;
    const { mentorId, timeSlotId } = req.params;

      if (!mentorId) {
      res.status(400).json({ message: "Mentor ID is required." });
      return;
    }

    const mentee = await Mentee.findOne({ where: { id: menteeId } });
    if (!mentee) {
      res.status(404).json({ message: "Mentee not found." });
      return;
    }

    const existingRequest = await MentorshipRequest.findOne({
      where: {
        menteeId,
        mentorId,
      },
    });

    if (!existingRequest) {
      res.status(401).json({
        message:
          "You have not sent a mentorship request yet. Please send a request first.",
      });
      return;
    }

    if (existingRequest.status === "pending") {
      res.status(401).json({
        message:
          "Your mentorship request is still pending. You cannot proceed with session booking yet.",
      });
      return;
    }

    if (existingRequest.status === "rejected") {
      res.status(401).json({
        message:
          "Your mentorship request was rejected. Mentor may be unavailable currently.",
      });
      return;
    }

   

      const slot = await TimeSlot.findByPk(timeSlotId);
      if (!slot || slot.isBooked) {
         res.status(400).json({ message: "Slot is unavailable" });
         return;
      }

    // session booking
    const mentor = await Mentor.findByPk(mentorId);
    if (!mentor) {
      res.status(404).json({ message: "Mentor not found." });
      return;
    }

    const newSession = await SessionBooking.create({
      menteeId: Number(menteeId),
      timeSlotId: Number(timeSlotId),
      status: "pending",
    });

    await slot.update({ isBooked: true });

    await sendSessionReminderEmail({
      to: mentee.email,
      mentorName: mentor.firstName,
      sessionDate: slot.date.toISOString().split("T")[0],
      startTime: slot.startTime,
      menteeTimeZone: mentee.timeZone || "UTC",
    });

    res.status(201).json({
      message: "Session booked successfully",
      session: newSession,
    });

  } catch (error) {
    console.error("Error creating session", error);
    res.status(500).json({ message: "Error creating session" });
  }
};


