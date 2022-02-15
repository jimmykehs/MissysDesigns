import React, { useEffect, useRef } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const CheckoutButton = ({ setCart, itemPrices, cart }) => {
  const total = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    function getTotal() {
      let subtotal = 0;
      itemPrices.forEach((price) => (subtotal += price));
      return subtotal;
    }
    total.current = getTotal();
    console.log(total.current);
  }, [itemPrices]);

  return (
    <PayPalButtons
      fundingSource="paypal"
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total.current,
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
  );
};

export default CheckoutButton;
