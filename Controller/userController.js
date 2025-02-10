const express = require("express");
const userRouter = express.Router();
const { registerUser, showUser } = require("../Model/userModel");
const passport = require("../strategies/main");

userRouter.get("/user/failedLogin", (req, res) => {
    res.status(401).json({ message: "Email or password is incorrect" });
});

userRouter.get("/loggedIn", showUser);

userRouter.post("/register", registerUser);


// Route for user login using Passport
userRouter.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/api/user/failedLogin" }),
    (req, res) => {
      res.json({ message: "Logged in" });
    }
  );

// Route for user logout
  userRouter.post("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error(err); // log the error
        res.status(500).send("Error logging out"); // return an error response
      } else {
        res.status(200).json({ message: "Logged out" });
      }
    });
  });

module.exports = userRouter;