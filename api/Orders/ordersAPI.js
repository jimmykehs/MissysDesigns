const express = require("express");
const {
  createOrder,
  getOrderById,
} = require("../../db/Orders/orderDBFunctions");
const { sendOrderConfirmationEmail } = require("../email");
const ordersRouter = express.Router();

ordersRouter.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    const {
      details: {
        id,
        purchase_units: [
          {
            shipping: { address },
          },
        ],
        payer: {
          name: { given_name, surname },
          email_address,
        },
      },
      cart,
      total,
      specialInstructions,
    } = req.body;

    const contactInfo = {
      first_name: given_name,
      last_name: surname,
      email: email_address,
      address1: address.address_line_1,
      address2: address.address_line_2,
      city: address.admin_area_2,
      state: address.admin_area_1,
      zip: address.postal_code,
    };

    const newOrder = await createOrder(
      id,
      contactInfo,
      cart,
      total,
      specialInstructions
    );
    await sendOrderConfirmationEmail(id);
    res.send(newOrder);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = ordersRouter;
