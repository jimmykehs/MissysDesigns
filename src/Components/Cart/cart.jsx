import React, { useState } from "react";
import CartItem from "./CartItem";
import "./cart.css";

const CartPage = ({ cart, setCart }) => {
  return (
    <div id="cart">
      <h1 className="page-title">Your Cart</h1>
      {cart.map((cartProduct, index) => {
        return (
          <CartItem
            key={cartProduct.id}
            cartProduct={cartProduct}
            cart={cart}
            setCart={setCart}
            index={index}
          />
        );
      })}

      <button className="proceed-to-checkout-btn">Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
