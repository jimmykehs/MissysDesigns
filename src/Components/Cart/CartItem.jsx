import React, { useEffect, useState } from "react";
import { plus, minus } from "../../Images";

const CartItem = ({ product, setCart, cart, index }) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [dbProduct, setdbProduct] = useState({});

  useEffect(() => {
    fetch(`api/products/${product.id}`)
      .then((res) => res.json())
      .then((result) => {
        setdbProduct(result);
      });
  }, []);

  function updateCart() {
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  }

  useEffect(() => {
    updateCart();
  }, [quantity]);

  const { name, image_url, price, product_id } = dbProduct;
  return (
    <div className="cart-item">
      <img className="product-image" src={image_url} alt="Product" />
      <div className="name-price-cart-item">
        <p>{name}</p>
        <p>${(Number(price) * quantity).toFixed(2)}</p>
      </div>
      <div className="options-cart-item">
        <div className="quantity-input">
          <img
            src={minus}
            alt="Decremement Quantity"
            onClick={() => {
              setQuantity(quantity - 1);
            }}
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            onBlur={(e) => {
              setQuantity(Number(e.target.value));
            }}
          />
          <img
            src={plus}
            alt="Increment Quantity"
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          />
        </div>
        <button
          onClick={() => {
            setCart(
              cart.filter((cartProduct) => cartProduct.id !== product_id)
            );
            // addToTotal(-(price * quantity));
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
