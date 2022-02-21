import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = ({ token }) => {
  const [allOrders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    function requireAuth() {
      fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return;
          } else {
            navigate("/");
          }
        })
        .catch(() => {
          navigate("/");
        });
    }
    requireAuth();

    function fetchOrders() {
      fetch("/api/admin/orders", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((result) => setOrders(result));
    }

    fetchOrders();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Contact Name</th>
            <th>Status</th>
            <th># Of Items</th>
            <th>Order Total</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order) => {
            const {
              orderDetails: { order_id, first_name, last_name, status, total },
            } = order;
            return (
              <tr key={order_id}>
                <td>
                  <a className="order-link" href={`/orders/${order_id}`}>
                    {order_id}
                  </a>
                </td>
                <td>{`${first_name} ${last_name}`}</td>
                <td>{status}</td>
                <td>{order.orderProducts.length}</td>
                <td>${total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
