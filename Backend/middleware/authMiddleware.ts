import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../types/customTypes";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const typedReq = req as AuthenticatedRequest;

  if (req.isAuthenticated && req.isAuthenticated()) {
    typedReq.user = req.user!;
    return next();
  }

  res.status(401).json({ message: "Unauthorized. Please log in." });
};
