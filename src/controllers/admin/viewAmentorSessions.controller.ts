import { RequestHandler } from "express";
import { SessionBooking, TimeSlot } from "../../models/u-index.js";

export const viewAmentorsessions: RequestHandler = async (req, res) => {
  try {
    const { mentorId } = req.params;

    const sessions = await SessionBooking.findAll({
      include: [
        {
          model: TimeSlot,
          as: "timeSlot",
          where: { mentorId }
        },
      ],
    });

    res.json({
      success: true,
      sessions,
    });
  } catch (error) {
    console.error("Error fetching sessions for mentor:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
