import { RequestHandler } from "express";
import { SessionBooking } from "../../models/u-index.js";

export const viewAmenteeSessions: RequestHandler = async (req, res) => {
  try {
    const { menteeId } = req.params;

   
    const sessions = await SessionBooking.findAll({ where: { menteeId } });

    res.json({
      success: true,
      sessions,
    });
  } catch (error) {
    console.error("Error fetching sessions for mentee:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
