import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const TradeActionWindow = ({ uid }) => {
  const [mode, setMode] = useState("BUY"); // "BUY" or "SELL"
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrderHistory(storedOrders);
  }, []);

  const handleTradeClick = () => {
    const newOrder = {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: mode, // BUY or SELL
      timestamp: new Date().toISOString(),
    };

    const updatedOrders = [...orderHistory, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrderHistory(updatedOrders);

    GeneralContext.closeBuyWindow();
  };

  const handleCancelClick = () => {
    GeneralContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      {/* Toggle between Buy and Sell */}
      <div className="trade-mode-toggle" style={{ marginBottom: "10px" }}>
        <button
          className={mode === "BUY" ? "active" : ""}
          onClick={() => setMode("BUY")}
        >
          Buy
        </button>
        <button
          className={mode === "SELL" ? "active" : ""}
          onClick={() => setMode("SELL")}
        >
          Sell
        </button>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
          Margin {mode === "BUY" ? "required" : "released"} ₹
          {(stockQuantity * stockPrice).toFixed(2)}
        </span>
        <div>
          <Link className="btn btn-blue" onClick={handleTradeClick}>
            {mode}
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
