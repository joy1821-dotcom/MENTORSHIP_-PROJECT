import { MentorshipRequest } from "../../models/u-index.js";
import { RequestHandler } from "express";
import { Op } from "sequelize";

export const requestsStatus: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const menteeId = req.user?.id;

    if (!menteeId) {
       res.status(401).json({ message: "Unauthorized user" });
       return;
    }



    const mentorshipRequest = await MentorshipRequest.findAll({
      where: {
        menteeId,
        status: {
          [Op.in]: ["accepted", "pending"],
        },
      },
    });

    if (mentorshipRequest === null || mentorshipRequest.length === 0) {
      res
        .status(404)
        .json({ message: "No mentorship request found" });
        return;
    }

    res.status(200).json({
      success: true,
        message: "Mentorship request fetched successfully",
      mentorshipRequest,
    });
  } catch (error) {
    console.error("Error in fetching session", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching session"
    });
  }
};
