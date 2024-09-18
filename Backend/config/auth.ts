import { Application } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
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
    (accessToken, refreshToken, profile, done) => {
      // Process the Google profile here
      return done(null, profile);
    }
  )
);

// Configure Passport for Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: "/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Process the Facebook profile here
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj as Express.User);
});

// Initialize Passport
export const initializePassport = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
