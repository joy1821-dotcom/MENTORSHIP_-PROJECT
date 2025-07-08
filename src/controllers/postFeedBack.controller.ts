import { RequestHandler } from "express";
import { SessionBooking, SessionFeedback, TimeSlot } from "../models/u-index.js";

export const postFeedback: RequestHandler = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { mentorComment, menteeComment, mentorRating, menteeRating } =
      req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized user" });
      return;
    }
    const { id: userId, role } = req.user;

    const session = await SessionBooking.findByPk(sessionId, {
      include: [{ model: TimeSlot, as: "timeSlot" }],
    });

    if (!session) {
      res.status(404).json({ message: "Session not found or not completed" });
      return;
    }

    const isMentor = role === "mentor" && session.timeSlot?.mentorId === userId;
    const isMentee = role === "mentee" && session.menteeId === userId;

    if (!isMentor && !isMentee) {
      res
        .status(403)
        .json({ message: "Unauthorized to give feedback for this session" });
      return;
    }

    let feedback = await SessionFeedback.findOne({
      where: { sessionBookingId: session.id },
    });

    if (!feedback) {
    
      feedback = await SessionFeedback.create({
        sessionBookingId: session.id,
        mentorComment: isMentor ? mentorComment : "",
        menteeComment: isMentee ? menteeComment : "",
        mentorRating: isMentor ? mentorRating : null,
        menteeRating: isMentee ? menteeRating : null,
      });
    } else {
    
      if (isMentor) {
        feedback.mentorComment = mentorComment ?? feedback.mentorComment;
        feedback.mentorRating = mentorRating ?? feedback.mentorRating;
      }

      if (isMentee) {
        feedback.menteeComment = menteeComment ?? feedback.menteeComment;
        feedback.menteeRating = menteeRating ?? feedback.menteeRating;
      }

      await feedback.save();
    }

    res.status(200).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error("Error posting feedback:", error);
    res.status(500).json({ message: "Server error while submitting feedback" });
  }
};
