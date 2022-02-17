import React, { useEffect, useRef, useState } from "react";

import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
import "./cart.css";
import Total from "./Total";

const CartPage = ({ cart, setCart, setNavContent }) => {
  const [itemPrices, setItemPrices] = useState([0]);
  const specialInstructions = useRef("");
  useEffect(() => {
    setNavContent({
      navText: "Your Cart",
      navTextLink: "/cart",
      navHome: true,
      navCart: false,
    });
  }, []);

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
  }

  function updateCartItemQuantity(index, quantity) {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  }

  function removeItemFromCart(itemId, index) {
    const newPrices = [...itemPrices];
    newPrices[index] = 0;
    setItemPrices(newPrices);
    setCart(cart.filter((cartProduct) => cartProduct.id !== itemId));
  }

  return (
    <div id="cart">
      {cart.length > 0 ? (
        <>
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

          <div id="total-and-checkout-container">
            <Total
              total={getTotal()}
              specialInstructions={specialInstructions}
            />
            <CheckoutButton
              setCart={setCart}
              cart={cart}
              itemPrices={itemPrices}
              specialInstructions={specialInstructions}
            />
          </div>
        </>
      ) : (
        <h1 className="page-title">Your Cart is Empty!</h1>
      )}
    </div>
  );
};

export default CartPage;
