import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { JwtPayload } from "./generateJwt.js";

const secretKey = process.env.JWT_SECRET || "your_default_secret";

export const authenticateUser: RequestHandler = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    req.user = {
      id: Number(decoded.id),
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }
};
