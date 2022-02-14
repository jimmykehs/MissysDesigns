import React from "react";

const OrderedProductCard = ({ product }) => {
  const { image_url, name, price, quantity } = product;
  return (
    <div className="order-item">
      <img className="product-image" src={image_url} alt="Product" />
      <div className="name-price-cart-item">
        <p>
          {quantity}X {name}
        </p>
        <p>${(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderedProductCard;
