import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { backArrow, minus, plus } from "../../Images";

const ProductDetails = ({ allProducts, cart, setCart }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  const product = allProducts.find(
    ({ product_id }) => product_id === Number(id)
  );
  const ProductInCart = cart.find(
    (cartItem) => cartItem.id === product.product_id
  );

  useEffect(() => {
    if (quantity < 1 && quantity !== "") {
      alert("Quantity can't be less than one!");
      setQuantity(1);
    }
  }, [quantity]);
  return product !== undefined ? (
    <div id="product-details-page">
      <div className="product-details-header">
        <img
          id="back-arrow"
          src={backArrow}
          alt="Back Arrow"
          onClick={() => {
            navigate(-1);
          }}
        />
        <h1 className="page-title">{product.name}</h1>
      </div>
      <img src={product.image_url} alt="Product" />
      <div className="product-details-body">
        <p className="product-price">${product.price}</p>
        <div className="quantity-add-to-cart-container">
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

          {ProductInCart ? (
            <button
              className="remove-from-cart-btn-lg"
              onClick={() => {
                setCart(
                  cart.filter((cartItem) => cartItem.id !== product.product_id)
                );
              }}
            >
              Remove From Cart
            </button>
          ) : (
            <button
              className="add-to-cart-btn-lg"
              onClick={() => {
                const newCart = [...cart];
                newCart.push({ id: product.product_id, quantity });
                setCart(newCart);
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    <h1>Nope</h1>
  );
};

export default ProductDetails;
