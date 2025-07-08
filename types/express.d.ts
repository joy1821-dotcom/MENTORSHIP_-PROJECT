import "express";

declare module "express-serve-static-core"{
    interface Request {
      user?: {
        id: number;
        role: "admin" | "mentor" | "mentee";
        timeZone?: string;
      };
    }
}