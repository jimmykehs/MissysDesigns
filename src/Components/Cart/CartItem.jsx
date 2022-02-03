import React, { useEffect, useState } from "react";
import { plus, minus } from "../../Images";

const CartItem = ({ cartProduct, setCart, cart, index }) => {
  const [dbProduct, setdbProduct] = useState({});
  const [quantity, setQuantity] = useState(cartProduct.quantity);

  useEffect(() => {
    fetch(`/api/products/${cartProduct.id}`)
      .then((res) => res.json())
      .then((result) => setdbProduct(result));
  }, [cartProduct]);

  useEffect(() => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
  }, [quantity]);

  const { product_id, name, price, image_url } = dbProduct;
  return (
    <div className="cart-item">
      <img className="product-image" src={image_url} alt="Product" />
      <div className="name-price-cart-item">
        <p>{name}</p>
        <p>${(price * quantity).toFixed(2)}</p>
      </div>
      <div className="options-cart-item">
        <div className="quantity-input">
          <img
            src={minus}
            alt="Decremement Quantity"
            onClick={() => {
              setQuantity(quantity - 1);
            }}
          ></img>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <img
            src={plus}
            alt="Increment Quantity"
            onClick={() => setQuantity(quantity + 1)}
          ></img>
        </div>
        <button
          onClick={() => {
            setCart(
              cart.filter((cartProduct) => cartProduct.id !== product_id)
            );
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
