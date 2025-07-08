import { Mentor } from "../../models/u-index.js";
import { Request, Response } from "express";

export async function viewAllMentors(req: Request, res: Response): Promise<void> {
  try {
    
    const mentorsList = await Mentor.findAll({
      attributes: ["id", "firstName", "email", "isAvailable"],
    });
    res.status(200).json({
      success: true,
      mentorsData: mentorsList,
    });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentors.",
    });
    return;
  }
}
