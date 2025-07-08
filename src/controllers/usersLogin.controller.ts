import { RequestHandler } from "express";
import { Mentor, Mentee } from "../models/u-index.js";
import { checkPassword } from "../checkPassw/checkPassword.js";
import { generateJwtPayload } from "../JWT/generateJwt.js";
import { signJwt } from "../JWT/signJwt.js";

type AuthUser = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const usersLogin: RequestHandler = async(req, res)=> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
       res
        .status(400)
        .json({ error: "Email and password are required." });
        return; 
    }

    let user: AuthUser | null = (await Mentor.findOne({
      where: { email },
    })) as AuthUser | null;
    let role = "mentor";

    if (!user) {
      user = (await Mentee.findOne({ where: { email } })) as AuthUser | null;
      role = "mentee";
    }

    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return; 
    }

    const passwordMatch = await checkPassword(password, user.password);
    if (!passwordMatch) {
       res.status(401).json({ error: "Invalid email or password." });
       return; 
    }

    const payload = generateJwtPayload({
      id: user.id.toString(),
      role: role as "mentor" | "mentee" ,
      email: user.email,
    });

    const token = signJwt(payload);
    if (!token) {
       res.status(500).json({ error: "Failed to generate token." });
       return; 
    }

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
