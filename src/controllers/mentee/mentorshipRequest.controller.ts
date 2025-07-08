import { Mentee, Mentor, MentorshipRequest, SessionBooking } from "../../models/u-index.js";
import { RequestHandler } from "express";
import { Op } from "sequelize";

export const mentorshipRequest: RequestHandler = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
     res.status(401).json({ message: "Unauthorized: User not found" });
     return; 
    }

    const mentorId = Number(req.params.mentorId);
    const menteeId = req.user.id;
    const { requestNote } = req.body;

    if (isNaN(mentorId)) {
      res.status(400).json({ message: "Invalid mentor ID" });
      return; 
    }

    if (!requestNote || typeof requestNote !== "string") {
      res
        .status(400)
        .json({ message: "Note is required and must be a string" });
        return; 
    }

    const isRequestExists = await MentorshipRequest.findOne({
      where: {
        mentorId,
        menteeId,
        status: {
          [Op.in]: ["pending", "accepted"],
        },
      },
    });

    if (isRequestExists?.status === "pending") {
      res.status(409).json({
        message:
          "You already have a pending request with this mentor. Please wait for it to be resolved before requesting a new one.",
      });
      return; 
    }

    if (isRequestExists?.status === "accepted") {
      res.status(409).json({
        message:
          "Your mentorship request has already been accepted. You may cancel it to request a new one.",
      });
      return; 
    }

    const mentee = await Mentee.findByPk(menteeId);
    const mentor = await Mentor.findByPk(mentorId);
    const existingSessions = await SessionBooking.findAll({
      where: {
        menteeId,
        status: "ongoing",
      },
    });

    if (!mentee || !mentor) {
      res.status(404).json({ message: "Mentee or Mentor not found" });
      return; 
    }

    if (!mentor.isAvailable) {
      res
        .status(400)
        .json({ message: "Mentor is currently unavailable for booking" });
      return;
    }

    if (existingSessions.length > 0) {
      res.status(400).json({
        message:
          "You already have a session ongoing with a mentor. Please wait for it to end.",
      });
      return; 
    }

    const newRequest = await MentorshipRequest.create({
      menteeId,
      mentorId,
      notes: requestNote,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Mentorship request sent successfully",
      request: newRequest,
    });
    return; 

  } catch (error) {
    console.error("Error in requesting mentorship", error);
    res.status(500).json({ message: "Internal server error" });
    return; 
  }
};
