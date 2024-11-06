import { Request, Response, NextFunction } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel";

// Google OAuth Handlers
export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });
export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/",
  session: true
});

export const handleGoogleCallback = (req: Request, res: Response): void => {
  console.log("User authenticated successfully:", req.user);
  res.redirect("http://localhost:3000");
};

// Facebook OAuth Handlers
export const facebookAuth = passport.authenticate("facebook");

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

// Email Signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = await createUser(email, hashedPassword); // Pass both email and hashed password to createUser

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d"
    });

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error signing up" });
  }
};

// Email Login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password || "");
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    // Exclude the password from the response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};


// Logout Handler
export const logout = (req: Request, res: Response, next: NextFunction): void => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000");
  });
};

// Current User Handler
export const getCurrentUser = (req: Request, res: Response): void => {
  res.json({
    user: req.user,
    message: "Authenticated user details retrieved successfully."
  });
};
