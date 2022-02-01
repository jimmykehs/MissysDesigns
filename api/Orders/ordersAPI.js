const express = require("express");
const { authenticateUser, checkForUser } = require("../utils");
const ordersRouter = express.Router();

ordersRouter.post("/", checkForUser, async (req, res, next) => {
  try {
  } catch (error) {
    throw error;
  }
});

module.exports = ordersRouter;
