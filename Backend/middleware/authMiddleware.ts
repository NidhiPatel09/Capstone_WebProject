import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Add your authentication logic here (e.g., checking session, tokens, etc.)
  console.log("Auth Middleware - Add your logic here.");
  next();
};
