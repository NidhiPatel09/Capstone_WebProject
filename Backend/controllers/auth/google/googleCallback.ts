import passport from "passport";

export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/",
  session: true
});
