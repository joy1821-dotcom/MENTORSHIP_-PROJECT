import Admin from "../models/admin.js";
import dotenv from "dotenv";
import { isUserEmailUnique } from "../validations/isUserEmailUnique.js";


dotenv.config();

export default async function seedAdmin() {
  try {
    const firstName = process.env.ADMIN_FIRST_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    //const first:string|undefined = "Boy"

    if (!firstName) {
      throw new Error("Name cannot be empty");
    }

    if (!email) {
      throw new Error("email cannot be empty");
    }

    if (!password) {
      throw new Error("password cannot be empty");
    }

    const existingAdmin = await Admin.findOne({
      where: { email },
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    const isEmailUnique = await isUserEmailUnique(email);
    if (!isEmailUnique) {
      console.log("Email is already in use.");
      return;
      }

    await Admin.create({
      email,
      firstName,
      password,
    });
  } catch (error) {
    console.log("Error in seeding admin", error);
  }
}
