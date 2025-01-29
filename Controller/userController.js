const express = require("express");
const userRouter = express.Router();
const { registerUser } = require("../Model/userModel");
const passport = require("../strategies/main");

userRouter.post("/register", registerUser);

module.exports = userRouter;