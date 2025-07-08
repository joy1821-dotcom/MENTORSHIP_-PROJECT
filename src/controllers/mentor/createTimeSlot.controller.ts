// controllers/timeSlotController.ts
import { RequestHandler } from "express";
import { TimeSlot } from "../../models/u-index.js";
import { differenceInMinutes, parse, format, isBefore } from "date-fns";

export const createTimeSlot: RequestHandler = async (req, res) => {
  try {
    const mentorId = req.user?.id;

    if (!mentorId) {
     res
        .status(400)
        .json({ message: "Mentor ID is missing from request" });
        return;
    }

    const { date, startTime, endTime } = req.body;

    if (!date || !startTime || !endTime) {
      res
        .status(400)
        .json({ message: "date, startTime, and endTime are required" });
        return;
    }

    const start = parse(startTime, "HH:mm", new Date());
    const end = parse(endTime, "HH:mm", new Date());

    const duration = differenceInMinutes(end, start);
    if (duration <= 0) {
     res
        .status(400)
        .json({
          message: "Invalid time range: endTime must be after startTime",
        });
        return;
    }

    const today = new Date();
    const dateObj = new Date(date);
    
    if (isBefore(dateObj, today)) {
       res
        .status(400)
        .json({ message: "Cannot create a time slot in the past" });
        return;
    }

    const day = format(dateObj, "EEEE");

    const slot = await TimeSlot.create({
      mentorId: Number(mentorId),
      date,
      day,
      startTime,
      endTime,
      duration,
      isBooked: false
    });

    res.status(201).json({
      message: "Time slot created successfully",
      slot,
    });
  } catch (error) {
    console.error("Error creating time slot:", error);
    res.status(500).json({ message: "Failed to create time slot" });
  }
};
