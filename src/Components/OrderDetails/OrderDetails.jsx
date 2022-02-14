import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderedProductCard from "./OrderedProductCard";
import "./OrderDetails.css";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  let { orderId } = useParams();
  useEffect(() => {
    fetch(`/api/order/${orderId}`)
      .then((res) => res.json())
      .then((result) => {
        setOrderDetails(result.orderDetails);
        setOrderProducts(result.orderProducts);
        console.log(result);
      });
  }, [orderId]);

  const {
    address1,
    address2,
    city,
    state,
    zip,
    first_name,
    last_name,
    status,
  } = orderDetails;
  return (
    <div id="order-details">
      {orderDetails.order_id === undefined ? (
        <h2 className="page-title">Order Not Found</h2>
      ) : (
        <>
          <h2 className="page-title">Order #{orderDetails.order_id}</h2>
          <p className={"order-status " + status.toLowerCase()}>{status}</p>
          <div className="order-contact-container">
            <h3>Shipping To:</h3>
            <p>
              {first_name} {last_name}
            </p>
            <p>{address1}</p>
            {address2 && <p>{address2}</p>}
            <p>
              {city}, {state} {zip}
            </p>
          </div>
          <div className="order-products">
            {orderProducts.map((product) => {
              return (
                <OrderedProductCard
                  key={product.product_id}
                  product={product}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
