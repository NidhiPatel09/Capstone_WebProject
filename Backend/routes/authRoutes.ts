import { Router } from "express";
import {
  googleAuth,
  googleCallback,
  handleGoogleCallback,
  facebookAuth,
  facebookCallback,
  logout,
  getCurrentUser,
  signup,
  login
} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Google OAuth routes
router.get("/google", googleAuth); // Initiates Google OAuth
router.get("/google/callback", googleCallback, handleGoogleCallback); // Handles Google OAuth callback

// Facebook OAuth routes
router.get("/facebook", facebookAuth); // Initiates Facebook OAuth
router.get("/facebook/callback", facebookCallback); // Handles Facebook OAuth callback

// Email signup route
router.post("/signup", signup);

// Email login route
router.post("/login", login);

// Logout route
router.get("/logout", logout);

// Route to get the current authenticated user
router.get("/current-user", authMiddleware, getCurrentUser);

export default router;
