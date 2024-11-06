import { Router } from "express";
import {
  googleAuth,
  googleCallback,
  facebookAuth,
  facebookCallback,
  logout,
  getCurrentUser
} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Google OAuth routes
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);

// Facebook OAuth routes
router.get("/facebook", facebookAuth);
router.get("/facebook/callback", facebookCallback);

// Logout route
router.get("/logout", logout);

// Route to get the current authenticated user
router.get("/current-user", authMiddleware, getCurrentUser); 

export default router;
