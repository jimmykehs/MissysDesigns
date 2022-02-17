import React from "react";

const OrderedProductCard = ({ product }) => {
  const { image_url, name, price, quantity } = product;
  return (
    <div className="order-item">
      <p className="ordered-product-quantity">{quantity}</p>
      <img className="product-image" src={image_url} alt="Product" />
      <div className="name-price-cart-item">
        <p className="cart-item-name">{name}</p>
        <p className="cart-item-price">${price}</p>
      </div>
    </div>
  );
};

export default OrderedProductCard;
