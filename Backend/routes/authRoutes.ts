import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    console.log("User authenticated successfully:", req.user);
    res.redirect("/api/recipes");
  }
);

// Facebook OAuth routes
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req: Request, res: Response) => {
    res.redirect("/api/recipes");
  }
);

// Logout route
router.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err); 
    }
    res.redirect("/");
  });
});

export default router;
