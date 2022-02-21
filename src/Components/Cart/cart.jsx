import React, { useEffect, useRef, useState } from "react";

import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";
import "./cart.css";
import Total from "./Total";

const CartPage = ({ cart, setCart, setNavContent }) => {
  const [itemPrices, setItemPrices] = useState([]);
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
    console.log(itemPrices);
  }, [itemPrices]);

  function getTotal() {
    let totalPrice = 0;
    itemPrices.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  }

  function updateItemPrices(productId, price) {
    const newItems = [...itemPrices];
    const existingIndex = newItems.findIndex(
      (item) => item.productId === productId
    );
    if (existingIndex !== -1) {
      newItems[existingIndex].price = price;
    } else if (productId === undefined) {
      return;
    } else {
      newItems.push({ productId, price });
    }
    setItemPrices(newItems);
  }

  function updateCartItemQuantity(index, quantity) {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  }

  function removeItemFromCart(productId) {
    const newItems = [...itemPrices];
    const index = newItems.findIndex((item) => item.productId === productId);
    newItems.splice(index, 1);
    setItemPrices(newItems);
    setCart(cart.filter((cartProduct) => cartProduct.id !== productId));
  }

  return (
    <div id="cart">
      {cart.length > 0 ? (
        <>
          <div id="cart-products">
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
          </div>

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
