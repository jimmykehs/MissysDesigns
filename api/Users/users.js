const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/me", (req, res, next) => {
  try {
    res.send("You made it!");
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/signup", (req, res, next) => {
  try {
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
