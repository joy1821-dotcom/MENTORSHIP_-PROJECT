import { RequestHandler } from "express";

export const isAdmin: RequestHandler = (req, res, next) => {
  //console.log("req.user in isAdmin middleware:", req.user); 
  if (!req.user || req.user.role !== "admin") {
    res.status(403).json({ message: "Admin only" });
    return;
  }
  next();
};
