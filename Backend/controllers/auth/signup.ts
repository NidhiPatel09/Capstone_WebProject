import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { findUserByEmail } from "../../services/user/findUserByEmail";
import { createUser } from "../../services/user/createUser";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstname, lastname } = req.body;

  // Validation
  const errors: { [key: string]: string } = {};

  // Check for required fields and sanitize input
  if (!email) {
    errors.email = "Email is required.";
  } else if (!validator.isEmail(email)) {
    errors.email = "Invalid email format.";
  } else if (!validator.isLength(email, { max: 100 })) {
    errors.email = "Email must be at most 100 characters long.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8}$/.test(password)
  ) {
    errors.password =
      "Password must be exactly 8 characters long, include one uppercase letter, one number, and one special character.";
  }

  if (!firstname) {
    errors.firstname = "First name is required.";
  } else if (!validator.isLength(firstname, { max: 50 })) {
    errors.firstname = "First name must be at most 50 characters long.";
  }

  if (!lastname) {
    errors.lastname = "Last name is required.";
  } else if (!validator.isLength(lastname, { max: 50 })) {
    errors.lastname = "Last name must be at most 50 characters long.";
  }

  // If there are validation errors, return them
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ errors });
    return;
  }

  // Sanitize inputs
  const sanitizedEmail = validator.normalizeEmail(email) || email;
  const sanitizedFirstname = validator.escape(firstname);
  const sanitizedLastname = validator.escape(lastname);

  try {
    const existingUser = await findUserByEmail(sanitizedEmail);

    // Check if user already exists
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const displayName = `${sanitizedFirstname} ${sanitizedLastname}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      email: sanitizedEmail,
      password: hashedPassword,
      displayName,
      favoriteRecipes: [],
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Set token in an HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      message: "Signup successful. ",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error signing up" });
  }
};
