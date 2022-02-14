import React, { useEffect, useState } from "react";
import { minus, plus } from "../../Images";

const ProductCard = ({ product, setCart, cart }) => {
  const [productInCart, setProductInCart] = useState(
    cart.find((cartProduct) => cartProduct.id === Number(product.product_id)) ||
      []
  );
  const [quantity, setQuantity] = useState(
    productInCart.quantity ? productInCart.quantity : 1
  );

  function updateQuantity() {
    const indexOfProduct = cart.findIndex((cartProduct) => {
      return cartProduct.id === product.product_id;
    });
    const updatedCart = [...cart];
    updatedCart[indexOfProduct].quantity = quantity;
    setCart(updatedCart);
  }

  useEffect(() => {
    if (productInCart.quantity) {
      updateQuantity();
    }
  }, [quantity]);

  return (
    <>
      <div className="product-card">
        <img
          src={product.image_url}
          alt="Product"
          className="product-img"
        ></img>
        <div className="product-details-and-btn">
          <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
          </div>
          <div className="product-button">
            {cart.find((cartItem) => cartItem.id === product.product_id) ? (
              <button
                className="remove-from-cart-btn"
                onClick={() => {
                  setCart(
                    cart.filter(
                      (cartItem) => cartItem.id !== product.product_id
                    )
                  );
                  setProductInCart({});
                }}
              >
                Remove from Cart
              </button>
            ) : (
              <button
                className="add-to-cart-btn"
                onClick={() => {
                  const newCart = [...cart];
                  newCart.push({ id: product.product_id, quantity: 1 });
                  setCart(newCart);
                  setProductInCart({ id: product.product_id, quantity: 1 });
                }}
              >
                Add to Cart
              </button>
            )}
            {productInCart.id && (
              <div className="quantity-input">
                <img
                  src={minus}
                  alt="Decremement Quantity"
                  onClick={() => setQuantity(quantity - 1)}
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
