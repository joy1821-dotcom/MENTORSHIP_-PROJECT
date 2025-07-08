import { SessionBooking, MentorshipRequest } from "../../models/u-index.js";
import { RequestHandler } from "express";

export const acceptMentorshipRequest: RequestHandler = async (req, res) => {
  try {
    const { requestId, menteeId } = req.params;
    const { update } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const mentorId = req.user?.id;

    if (!mentorId || !menteeId) {
       res
        .status(400)
        .json({ error: "Both mentorId and menteeId are required." });
        return;
    }

 

    if (!["accept", "cancel"].includes(update)) {
       res
        .status(400)
        .json({ error: "Update action must be either 'accept' or 'cancel'." });
        return;
    }

    const request = await MentorshipRequest.findByPk(requestId);
    console.log("Request ID:", requestId);
    console.log("Mentorship request:", request);
    if (!request) {
       res.status(404).json({ error: "Mentorship request not found." });
       return;
    }

    if (request.menteeId !== Number(menteeId)) {
      res.status(400).json({ error: "Mentee ID mismatch." });
      return;
    }

    if (request.mentorId !== Number(mentorId)) {
       res
        .status(403)
        .json({ error: "You are not authorized to update this request." });
        return;
    }

    if (request.status === "accepted" && update === "accept") {
       res
        .status(400)
        .json({ error: "This mentorship request has already been accepted." });
        return;
    }

    if (update === "cancel") {
      request.status = "rejected";
      await request.save();
       res
        .status(200)
        .json({ message: "Mentorship request has been cancelled." });
        return;
    }

    if (update === "accept") {
      request.status = "accepted";
      await request.save();
       res
        .status(200)
        .json({ message: "Mentorship request has been accepted." });
        return;
    }
  } catch (error) {
    console.error("Error accepting mentorship request:", error);
     res.status(500).json({ error: "Internal server error" });
  }
};
