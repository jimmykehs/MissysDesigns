require("dotenv").config();
const bcrypt = require("bcrypt");

const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserByUsername,
  getUserById,
} = require("../../db/Users/userDBFunctions");
const { authenticateUser, generateAccessToken } = require("../utils");

usersRouter.get("/me", authenticateUser, async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    delete user.password;
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const user = await getUserByUsername(req.body.email);
    const pwMatch = await bcrypt.compare(req.body.password, user.password);
    if (pwMatch) {
      const accessToken = await generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      res.json({ accessToken, refreshToken });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/signup", async (req, res, next) => {
  try {
    const newUser = await createUser(req.body);
    const accessToken = await generateAccessToken(newUser);
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
