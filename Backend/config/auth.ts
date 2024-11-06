import { Application } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
<<<<<<< HEAD
import {
  createUser,
  findUserById,
  findUserByEmail,
  findUserByFacebookId,
  createUserWithFacebookId,
  updateUserProfile
} from "../models/userModel";
=======
import { updateUserProfile } from "../services/user/updateUserProfile";
import { findUserByEmail } from "../services/user/findUserByEmail";
import { findUserByFacebookId } from "../services/user/findUserByFacebookId";
import { findUserById } from "../services/user/findUserById";
import { createUserWithFacebookId } from "../services/user/createUserWithFacebookId";
import { createUser } from "../services/user/createUser";
>>>>>>> main
import { getDB } from "../config/db";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

<<<<<<< HEAD
// Configure Passport for Google Strategy
=======
>>>>>>> main
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
<<<<<<< HEAD
        // Find or create the user
=======
>>>>>>> main
        const email = profile.emails?.[0].value;
        if (email) {
          let user = await findUserByEmail(email);
          if (!user) {
            user = await createUser(email);
          }

<<<<<<< HEAD
          // Check if _id exists before proceeding
          if (user._id) {
=======
          if (user?._id) {
>>>>>>> main
            return done(null, { ...user, _id: user._id.toString() });
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
      profileFields: ["id", "displayName", "photos"],
      enableProof: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Access Token:", accessToken);
      console.log("Profile Object:", profile);

      try {
<<<<<<< HEAD
        // Extract profile data
        const facebookId = profile.id;
        const displayName = profile.displayName;
        const profilePicture =
          profile.photos && profile.photos[0] ? profile.photos[0].value : ""; 
=======
        const facebookId = profile.id;
        const displayName = profile.displayName;
        const profilePicture =
          profile.photos && profile.photos[0] ? profile.photos[0].value : "";
>>>>>>> main

        // Find or create the user based on Facebook ID
        let user = await findUserByFacebookId(facebookId);
        if (!user) {
<<<<<<< HEAD
          user = await createUserWithFacebookId(facebookId, displayName, profilePicture);
        } else {
          // Update the user's displayName and profilePicture in case they changed
          await updateUserProfile(user._id?.toString() || "", displayName, profilePicture);
=======
          user = await createUserWithFacebookId(
            facebookId,
            displayName,
            profilePicture
          );
        } else {
          await updateUserProfile(
            user._id?.toString() || "",
            displayName,
            profilePicture
          );
>>>>>>> main
          user.displayName = displayName;
          user.profilePicture = profilePicture;
        }

        if (user && user._id) {
          return done(null, { ...user, _id: user._id.toString() });
        } else {
          return done(new Error("User creation or fetching failed"), false);
        }
      } catch (error) {
        console.error("Error during Facebook authentication:", error);
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  if (user && user._id) {
<<<<<<< HEAD
    done(null, user._id.toString()); 
  } else {
    done(new Error("User ID is missing"), null); 
=======
    done(null, user._id.toString());
  } else {
    done(new Error("User ID is missing"), null);
>>>>>>> main
  }
});

passport.deserializeUser(async (id: string, done) => {
  try {
<<<<<<< HEAD
    const user = await getDB().collection("users").findOne({ _id: new ObjectId(id) });

    if (user) {
      done(null, { ...user, _id: user._id.toString() }); 
    } else {
      done(null, false); 
=======
    const user = await getDB()
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    if (user) {
      done(null, { ...user, _id: user._id.toString() });
    } else {
      done(null, false);
>>>>>>> main
    }
  } catch (error) {
    done(error);
  }
});

<<<<<<< HEAD
// Initialize Passport for the app
=======
// Initialization
>>>>>>> main
export const initializePassport = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
