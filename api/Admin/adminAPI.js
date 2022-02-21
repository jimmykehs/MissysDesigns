const express = require("express");
const { getAllOrders } = require("../../db/Orders/orderDBFunctions");
const { authenticateUser, checkForUser } = require("../utils");
const adminRouter = express.Router();

adminRouter.get("/orders", checkForUser, async (req, res, next) => {
  try {
    const allOrders = await getAllOrders();
    res.send(allOrders);
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/auth", checkForUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = adminRouter;
