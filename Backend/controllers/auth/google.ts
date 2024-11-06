import passport from "passport";
import { Request, Response } from "express";

// Google authentication initiation
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google callback handler
export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/",
  session: true,
});

// Handle redirection after successful Google authentication
export const handleGoogleCallback = (req: Request, res: Response): void => {
  console.log("User authenticated successfully:", req.user);
  res.redirect("http://localhost:3000");
};
