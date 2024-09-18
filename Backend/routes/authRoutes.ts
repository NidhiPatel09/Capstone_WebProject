import { Router } from "express";

const router = Router();

// Placeholder for Auth.js routes (Sign In, Sign Out, etc.)
router.post("/login", (req, res) => {
  res.send("Login route");
});

router.post("/logout", (req, res) => {
  res.send("Logout route");
});

export default router;
