import { Request, Response, NextFunction, RequestHandler } from "express";

export const authorizeRoles = (...allowedRoles: string[]): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userRole = req.user?.role;
      if (!userRole || !allowedRoles.includes(userRole)) {
        res.status(403).json({ message: "Access denied" });
        return;
      }
      next();
    } catch (error) {
      console.error("Error in authorizeRoles middleware:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
