const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./Users/usersAPI.js");
const productsRouter = require("./Products/productsAPI");
const cartRouter = require("./Cart/cartAPI");
const ordersRouter = require("./Orders/ordersAPI.js");

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/order", ordersRouter);

module.exports = apiRouter;
