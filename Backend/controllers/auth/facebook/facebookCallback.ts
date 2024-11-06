import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const facebookCallback = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate("facebook", (err: Error | null, user: any, info: any) => {
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).json({ error: "Authentication error", details: err.message });
    }
    if (!user) {
      console.warn("Authentication failed:", info);
      return res.status(401).json({ error: "Authentication failed", details: info });
    }

    console.log("User authenticated successfully:", user);

    req.logIn(user, (err: Error | null) => {
      if (err) {
        console.error("Error logging in user:", err);
        return res.status(500).json({ error: "Login error", details: err.message });
      }
      return res.redirect("http://localhost:3000");
    });
  })(req, res, next);
};
