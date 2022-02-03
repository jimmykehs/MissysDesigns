const express = require("express");
const {
  getAllProducts,
  getProductById,
} = require("../../db/Products/productDBFunctions");
const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
