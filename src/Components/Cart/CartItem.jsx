import React, { useEffect, useState } from "react";
// import { plus, minus } from "../../Images";

const CartItem = ({
  cartProduct,
  index,
  updateCartItemQuantity,
  updateItemPrices,
  removeItemFromCart,
}) => {
  const [quantity, setQuantity] = useState(cartProduct.quantity || 0);
  const [dbProduct, setDBProduct] = useState({});

  useEffect(() => {
    fetch(`/api/products/${cartProduct.id}`)
      .then((res) => res.json())
      .then((result) => {
        setDBProduct(result);
      });
  }, [cartProduct]);

  useEffect(() => {
    if (dbProduct.product_id !== undefined) {
      updateItemPrices(dbProduct.product_id, dbProduct.price * quantity);
    }
  }, [dbProduct]);

  useEffect(() => {
    if (quantity < 1) {
      alert("Quantity must be greater than 0");
      setQuantity(1);
    } else {
      updateCartItemQuantity(index, quantity);
      updateItemPrices(dbProduct.product_id, dbProduct.price * quantity);
    }
  }, [quantity]);

  const { name, price, image_url } = dbProduct;
  return (
    <div className="cart-item">
      <img className="product-image" src={image_url} alt="Product" />
      <div className="name-price-cart-item">
        <p className="cart-item-name">{name}</p>
        <p className="cart-item-price">${(price * quantity).toFixed(2)}</p>
      </div>
      <div className="options-cart-item">
        <div className="quantity-input">
          <button
            className="decrease-quantity-btn"
            alt="Decremement Quantity"
            onClick={() => {
              setQuantity(quantity - 1);
            }}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <button
            alt="Increment Quantity"
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>
        </div>
        <button
          className="remove-from-cart-btn-sm"
          onClick={() => {
            removeItemFromCart(cartProduct.id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
