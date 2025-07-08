import jwt from "jsonwebtoken";
import { JwtPayload } from "./generateJwt.js";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("JWT_SECRET environment variable is not set");
}

export const signJwt = (payload: JwtPayload, expiresIn = "1h"): string => {
  return jwt.sign(payload, secretKey, { expiresIn });
};
