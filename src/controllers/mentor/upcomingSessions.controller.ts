import { SessionBooking } from "../../models/u-index.js";
import { RequestHandler } from "express";
import { Op } from "sequelize";

export const upcomingSessions: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const menteeId = req.user?.id;

    if (!menteeId) {
      res.status(401).json({ message: "Unauthorized user" });
      return;
    }

    const upcomingSessions = await SessionBooking.findAll({
      where: {
        menteeId,
        status: {
          [Op.in]: ["accepted"],
        },
      },
    });

    if (upcomingSessions === null || upcomingSessions.length === 0) {
      res.status(404).json({ message: "No upcoming session found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Sessions request fetched successfully",
      upcomingSessions,
    });
  } catch (error) {
    console.error("Error in fetching sessions", error);
    res.status(500).json({
      success: false,
      message: "Error in fetching sessions",
    });
  }
};
