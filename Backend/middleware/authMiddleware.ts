import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  
  console.log("Auth Middleware - Add your logic here.");
  next();
};
