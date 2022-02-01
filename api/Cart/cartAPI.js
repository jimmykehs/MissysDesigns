const express = require("express");
const {
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart,
  clearCart,
} = require("../../db/Cart/cartDBFunctions");
const { authenticateUser } = require("../utils");
const cartRouter = express.Router();

cartRouter.post("/:productId", authenticateUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    const { quantity } = req.body;
    const addedProduct = await addProductToCart(id, productId, quantity);
    res.send(addedProduct);
  } catch (error) {
    next(error);
  }
});

cartRouter.patch("/:productId", authenticateUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    const { quantity } = req.body;
    const updatedCartProduct = await updateProductQuantity(
      id,
      productId,
      quantity
    );
    res.send(updatedCartProduct);
  } catch (error) {
    next(error);
  }
});
cartRouter.delete("/all", authenticateUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const removedItems = await clearCart(id);
    res.send(removedItems);
  } catch (error) {
    next(error);
  }
});

cartRouter.delete("/:productId", authenticateUser, async (req, res, next) => {
  try {
    const { id } = req.user;
    const { productId } = req.params;
    const deletedCartProduct = await removeProductFromCart(id, productId);
    res.send(deletedCartProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
