import {Mentee, Mentor, Admin} from "../../src/models/u-index.js";


export const isUserEmailUnique = async (email:string):Promise<boolean> => {
    const mentor = await Mentor.findOne({ where: { email } });
    if(mentor) return false;

    const mentee = await Mentee.findOne({ where: { email } });
    if(mentee) return false;

    const admin = await Admin.findOne({ where: { email } });
    if(admin) return false;

    return true;
}