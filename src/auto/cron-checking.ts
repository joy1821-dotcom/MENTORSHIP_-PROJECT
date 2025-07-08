// cron-checking.ts
import { SessionBooking, TimeSlot } from "../models/u-index.js";
import { Op } from "sequelize";

export async function checkAndCompleteSessions() {
  console.log("Checking sessions for completion...");

  try {
    const sessions = await SessionBooking.findAll({
      where: {
        status: { [Op.in]: ["pending", "ongoing"] },
      },
      include: [{ model: TimeSlot, as: "timeSlot" }],
    });

    const now = new Date();

    const completedSessions = [];

    for (const session of sessions) {
      const slot = session.timeSlot;
      if (!slot) continue;

      const sessionEnd = new Date(`${slot.date}T${slot.endTime}`);

      if (sessionEnd <= now) {
        session.status = "completed";
        await session.save();
        completedSessions.push(session.id);
      }
    }

    if (completedSessions.length) {
      console.log(`Completed sessions: ${completedSessions.join(", ")}`);
    }
  } catch (err) {
    console.error("Failed to complete sessions:", err);
  }
}
