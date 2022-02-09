import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import "./cart.css";

const CartPage = ({ cart, setCart }) => {
  return (
    <div id="cart">
      <h1 className="page-title">Your Cart</h1>
      {cart.map((product, index) => {
        return (
          <CartItem
            key={product.id}
            product={product}
            cart={cart}
            setCart={setCart}
            index={index}
          />
        );
      })}
      <div id="price-box">
        <h3>Total:</h3>
        <p className="price">$</p>
      </div>
      <button className="proceed-to-checkout-btn">Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
