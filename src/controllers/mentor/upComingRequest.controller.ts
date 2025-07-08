import MentorshipRequest from "../../models/mentorshipRequest.js";

import { RequestHandler } from "express";

export const upComingRequests: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const mentorId = req.user?.id;

    if (!mentorId) {
      res.status(400).json({ success: false, message: "Mentor ID is missing" });
      return;
    }

    const comingRequests = await MentorshipRequest.findAll({
      where: { mentorId },
      attributes: ["menteeId","mentorId", "id","notes", "status"],
    });

    const allRequests = comingRequests.map((request) => ({
    requestId: request.id,
      mentorId: request.mentorId,
      menteeId: request.menteeId,
      notes: request.notes,
      status: request.status
    }));

    if (allRequests.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "No upcoming requests found" });
      return;
    }

    res.status(200).json({ success: true, allRequests });
  } catch (error) {
    console.error("Error in fetching upcoming requests", error);
    res
      .status(500)
      .json({ message: "Error in fetching upcoming requests"});
  }
};
