const express = require("express");
const { authenticateUser, checkForUser } = require("../utils");
const axios = require("axios");
const qs = require("qs");
const {
  createOrder,
  getOrderById,
} = require("../../db/Orders/orderDBFunctions");
const ordersRouter = express.Router();

async function getPayPalToken() {
  try {
    const options = {
      method: "POST",
      data: "grant_type=client_credentials",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.REACT_APP_PAYPAL_CLIENT_ID,
        password: process.env.REACT_APP_PAYPAL_SECRET_ID,
      },
      url: "https://api.sandbox.paypal.com/v1/oauth2/token",
    };
    const {
      data: { access_token },
    } = await axios(options);

    return access_token;
  } catch (error) {
    throw error;
  }
}
ordersRouter.get("/:orderId", async (req, res, next) => {
  try {
    console.log("IN ROUTE");
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
      purchase_units: [
        {
          shipping: { address },
        },
      ],
      payer: {
        name: { given_name, surname },
        email_address,
      },
    } = req.body[0];
    const { id } = req.body[0];
    const cart = req.body[1];

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

    const newOrder = await createOrder(id, contactInfo, cart);
    console.log(newOrder);
    res.send(req.body);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = ordersRouter;
