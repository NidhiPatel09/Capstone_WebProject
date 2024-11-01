import { Application } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { createUser, findUserByEmail, User } from "../models/userModel"; // Import User type from userModel
import { getDB } from "../config/db";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Configure Passport for Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create the user
        const email = profile.emails?.[0].value;
        if (email) {
          let user = await findUserByEmail(email);
          if (!user) {
            user = await createUser(email);
          }

          // Check if _id exists before proceeding
          if (user._id) {
            return done(null, { ...user, _id: user._id.toString() }); // Ensure _id is a string
          } else {
            return done(new Error("User ID is missing"), false);
          }
        }
        return done(null, false);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create the user
        const email = profile.emails?.[0].value;
        if (email) {
          let user = await findUserByEmail(email);
          if (!user) {
            user = await createUser(email);
          }

          // Check if _id exists before proceeding
          if (user._id) {
            return done(null, { ...user, _id: user._id.toString() }); // Ensure _id is a string
          } else {
            return done(new Error("User ID is missing"), false);
          }
        }
        return done(null, false);
      } catch (error) {
        return done(error);
      }
    }
  )
);


passport.serializeUser((user: any, done) => {
  if (user && user._id) {
    done(null, user._id.toString()); // Ensure _id is always a string
  } else {
    done(new Error("User ID is missing"), null); // Handle case where _id is undefined
  }
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await getDB().collection("users").findOne({ _id: new ObjectId(id) });
    
    if (user) {
      done(null, { ...user, _id: user._id.toString() }); // Ensure _id is always a string
    } else {
      done(null, false); // Handle case where user is not found
    }
  } catch (error) {
    done(error);
  }
});


// Initialize Passport
export const initializePassport = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
