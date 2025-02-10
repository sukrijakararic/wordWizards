// Google authentication
const passport = require("../strategies/main");
const express = require("express");
const googleRouter = express.Router();


googleRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

googleRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/users/failedLogin",
  }),
  (req, res) => {
    console.log("req.user: ", req.user);
    req.session.user = req.user;
    // make sure to change the redirect to root when pushing to production
    res.status(200).redirect("localhost:5173");
  }
);

module.exports = googleRouter;