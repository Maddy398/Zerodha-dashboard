import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const hasOrders = orders.length > 0;

  const renderOrders = (type) =>
    orders
      .filter((order) => order.mode === type)
      .map((order, index) => (
        <li key={index}>
          {type} {order.qty} @ ₹{order.price} 
        </li>
      ));

  return (
    <div className="orders">
      {!hasOrders ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-list">
          <h3>Buy Orders</h3>
          <ul>{renderOrders("BUY")}</ul>

          <h3>Sell Orders</h3>
          <ul>{renderOrders("SELL")}</ul>
        </div>
      )}
    </div>
  );
};

export default Orders;
