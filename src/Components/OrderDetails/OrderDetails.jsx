import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderedProductCard from "./OrderedProductCard";
import "./OrderDetails.css";

const OrderDetails = ({ setNavContent }) => {
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
        setNavContent({
          navText: `#${result.orderDetails.order_id}`,
          navTextLink: `/orders/${result.orderDetails.order_id}`,
          navHome: true,
          navCart: false,
        });
      })
      .catch((e) => console.log(e));
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
    special_instructions,
    total,
  } = orderDetails;
  console.log(orderDetails);
  return (
    <div id="order-details">
      {orderDetails.order_id === undefined ? (
        <h2 className="page-title">Order Not Found</h2>
      ) : (
        <>
          <div className="order-contact-container">
            <h3>Shipping Details</h3>
            <p>
              {first_name} {last_name}
            </p>
            <p>{address1}</p>
            {address2 && <p>{address2}</p>}
            <p>
              {city}, {state} {zip}
            </p>
          </div>
          <div className="order-status-container">
            <p>Status:&nbsp;</p>
            <p className="order-status">{status.toUpperCase()}</p>
          </div>
          {special_instructions && (
            <div className="order-instructions-container">
              <p>Special Instructions:&nbsp;</p>
              <p className="order-instructions">{special_instructions}</p>
            </div>
          )}

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
          <div className="order-total-container">
            <p>Total:</p>
            <p>{total}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
