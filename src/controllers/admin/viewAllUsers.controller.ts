import {Mentor, Mentee} from "../../models/u-index.js"
import { Request, Response } from "express";

export async function viewAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const menteesList = await Mentee.findAll({
      attributes:["id", "firstName", "email"]
    });
const mentorsList = await Mentor.findAll({
  attributes:["id", "firstName", "email", "isAvailable"]
});
    res.status(200).json({
      success: true,
      menteesData: menteesList,
      mentorsData: mentorsList
    });
  } catch (error) {
    console.error("Error fetching mentees and mentors:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentees and mentors.",
    });
    return;
  }
}
