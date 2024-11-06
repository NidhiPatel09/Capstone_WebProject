import { Request, Response } from "express";

export const handleGoogleCallback = (req: Request, res: Response): void => {
  console.log("User authenticated successfully:", req.user);
  res.redirect("http://localhost:3000");
};
