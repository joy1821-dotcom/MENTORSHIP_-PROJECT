import { SessionBooking, TimeSlot, Mentee, Mentor } from "../models/u-index.js";
import { sendSessionReminderEmail } from "../services/emailService.js";

export async function triggerUpcomingSessionReminders() {
  const now = new Date();
  const upcoming = new Date(now.getTime() + 30 * 60000); 

  const sessions = await SessionBooking.findAll({
    where: { status: "pending" },
    include: [
      {
        model: TimeSlot,
        as: "timeSlot",
        include: [{ model: Mentor, as: "mentor" }], 
      },
      { model: Mentee, as: "mentee" },
    ],
  });

  for (const session of sessions) {
    const slot = session.timeSlot;
    const mentee = session.mentee;
    const mentor = slot?.mentor;

    if (!slot || !mentee || !mentor) continue;

    const sessionStart = new Date(`${slot.date}T${slot.startTime}`);
    const diff = Math.abs(sessionStart.getTime() - upcoming.getTime());

   
    if (diff < 60000) {
      await sendSessionReminderEmail({
        to: mentee.email,
        mentorName: mentor.firstName,
        sessionDate: slot.date.toISOString().split("T")[0],
        startTime: slot.startTime,
        menteeTimeZone: mentee.timeZone || "UTC",
      });
    }
  }
}
