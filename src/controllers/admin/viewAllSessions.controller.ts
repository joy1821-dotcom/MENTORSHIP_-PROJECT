import { RequestHandler } from "express"
import {SessionBooking} from "../../models/u-index.js"

export const viewAllSession: RequestHandler = async (req, res): Promise<void> =>{
    try {
        const allSessions = await SessionBooking.findAll()
        if(!allSessions){
            res.status(404).json({message: "No session found"})
            return; 
        }
    } catch (error) {
        console.error("Error fetching sessions,", error);
        
        res.status(500).json({
          success: false,
          message: "Failed to fetch mentees and mentors.",
        });
        return;
    }
};