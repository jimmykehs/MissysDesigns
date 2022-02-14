import React, { useEffect, useState } from "react";
import "./checkout.css";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const ShippingDetails = ({ cart, setCart }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let subtotal = 0;
    cart.forEach((cartProduct) => {
      fetch(`/api/products/${cartProduct.id}`)
        .then((res) => res.json())
        .then((result) => {
          subtotal += result.price * cartProduct.quantity;
        })
        .then(() => {
          setTotal(subtotal.toFixed(2));
        });
    });
  }, [cart]);

  return (
    <div id="shipping-details">
      <h1 className="page-title">Checkout</h1>
      {total > 0 && (
        <PayPalButtons
          fundingSource="paypal"
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              fetch("/api/order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify([details, cart]),
              }).then(() => {
                navigate(`/orders/${details.id}`);
                setCart([]);
              });
            });
          }}
        />
      )}
    </div>
  );
};

export default ShippingDetails;
