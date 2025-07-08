import { TimeSlot, Mentor } from "../../models/u-index.js";
import { RequestHandler } from "express";
import { formatInTimeZone } from "date-fns-tz";

export const getAvailableSlots: RequestHandler = async (req, res) => {
  try {
    // Time zone priority: user profile > query param > UTC
    const menteeTimeZone =
      req.user?.timeZone || req.query.menteeTimeZone?.toString() || "UTC";

    const slots = await TimeSlot.findAll({
      where: { isBooked: false },
      include: [
        {
          model: Mentor,
          as: "mentor",
          attributes: ["mentorId", "firstName"],
        },
      ],
    });

    const formatted = slots.map((slot) => {
      const dateTime = `${slot.date}T${slot.startTime}`; // ISO format

      return {
        id: slot.id,
        day: slot.day,
        mentor: slot.mentor?.firstName,
        mentorId: slot.mentorId,
        dateTimeLocal: formatInTimeZone(
          new Date(dateTime),
          menteeTimeZone,
          "yyyy-MM-dd HH:mm zzz"
        ),
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error("Error in getAvailableSlots:", error);
    res.status(500).json({ message: "Failed to fetch available slots" });
  }
};
