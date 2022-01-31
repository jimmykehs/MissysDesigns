const express = require("express");
const { getAllProducts } = require("../../db/Products/productDBFunctions");
const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
