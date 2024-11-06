import { Router } from "express";
import {
  googleAuth,
  googleCallback,
<<<<<<< HEAD
  facebookAuth,
  facebookCallback,
  logout,
  getCurrentUser
} from "../controllers/authController";
=======
  handleGoogleCallback,
} from "../controllers/auth/google";
import { facebookAuth, facebookCallback } from "../controllers/auth/facebook";
import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { logout } from "../controllers/auth/logout";
import { getCurrentUser } from "../controllers/auth/getCurrentUser";
>>>>>>> main
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Google OAuth routes
router.get("/google", googleAuth);
<<<<<<< HEAD
router.get("/google/callback", googleCallback);
=======
router.get("/google/callback", googleCallback, handleGoogleCallback);
>>>>>>> main

// Facebook OAuth routes
router.get("/facebook", facebookAuth);
router.get("/facebook/callback", facebookCallback);

<<<<<<< HEAD
// Logout route
router.get("/logout", logout);

// Route to get the current authenticated user
router.get("/current-user", authMiddleware, getCurrentUser); 
=======
// Email signup and login
router.post("/signup", signup);
router.post("/login", login);

// Logout and current user
router.get("/logout", logout);
router.get("/current-user", authMiddleware, getCurrentUser);
>>>>>>> main

export default router;
