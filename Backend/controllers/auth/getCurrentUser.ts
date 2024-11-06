import { Request, Response } from "express";

export const getCurrentUser = (req: Request, res: Response): void => {
  res.json({
    user: req.user,
    message: "Authenticated user details retrieved successfully."
  });
};
