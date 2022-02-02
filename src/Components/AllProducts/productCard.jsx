import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, setCart, cart }) => {
  let navigate = useNavigate();
  return (
    <>
      <div className="product-card">
        <img
          src={product.image_url}
          alt="Product"
          className="product-img"
          onClick={() => navigate(`/product/${product.product_id}`)}
        ></img>
        <h3>{product.name}</h3>
        <div className="price-and-btn-container">
          <p>${product.price}</p>
          {cart.find((cartItem) => cartItem.id === product.product_id) ? (
            <div
              className="remove-from-cart-btn-sm"
              onClick={() => {
                setCart(
                  cart.filter((cartItem) => cartItem.id !== product.product_id)
                );
              }}
            >
              X
            </div>
          ) : (
            <div
              className="add-to-cart-btn-sm"
              onClick={() => {
                const newCart = [...cart];
                newCart.push({ id: product.product_id, quantity: 1 });
                setCart(newCart);
              }}
            >
              +
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
