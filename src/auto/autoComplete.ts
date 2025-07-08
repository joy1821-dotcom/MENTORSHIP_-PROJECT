import cron from "node-cron";
import { checkAndCompleteSessions } from "./cron-checking.js";
import { triggerUpcomingSessionReminders } from "../services/triggerSendReminderEmail.js";


export function autoMation(cronSchedule = "* * * * *") {
  const task = cron.schedule(cronSchedule, async () => {
    console.log("Running automation...");

    await checkAndCompleteSessions();           
    await triggerUpcomingSessionReminders();    


    console.log("Automation complete.");
  });

  return task;
}
