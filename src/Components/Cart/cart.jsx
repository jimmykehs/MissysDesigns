import React, { useEffect, useState } from "react";

import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
import "./cart.css";
import Total from "./Total";

const CartPage = ({ cart, setCart }) => {
  const [itemPrices, setItemPrices] = useState([0]);
  useEffect(() => {
    getTotal();
  }, [itemPrices]);

  function getTotal() {
    let totalPrice = 0;
    itemPrices.forEach((price) => {
      totalPrice += price;
    });
    return totalPrice;
  }

  function updateItemPrices(index, price) {
    const newPrices = [...itemPrices];
    newPrices[index] = price;
    setItemPrices(newPrices);
    console.log(itemPrices);
  }

  function updateCartItemQuantity(index, quantity) {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  }

  function removeItemFromCart(itemId, index) {
    itemPrices[index] = 0;
    setCart(cart.filter((cartProduct) => cartProduct.id !== itemId));
  }

  return (
    <div id="cart">
      {cart.length > 0 ? (
        <>
          <h1 className="page-title">Your Cart</h1>
          {cart.map((cartProduct, index) => {
            return (
              <CartItem
                key={cartProduct.id}
                cartProduct={cartProduct}
                index={index}
                updateCartItemQuantity={updateCartItemQuantity}
                updateItemPrices={updateItemPrices}
                removeItemFromCart={removeItemFromCart}
              />
            );
          })}
          <Total total={getTotal()} />
          <CheckoutButton
            setCart={setCart}
            cart={cart}
            itemPrices={itemPrices}
          />
        </>
      ) : (
        <h1 className="page-title">Your Cart is Empty!</h1>
      )}
    </div>
  );
};

export default CartPage;
