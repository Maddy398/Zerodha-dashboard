import React, { useState, useEffect } from "react";
import "./BuyActionWindow.css"; // Reuse your styles

const TradeActionWindow = ({ uid, mode: initialMode, onClose }) => {
  const [mode, setMode] = useState(initialMode || "BUY"); // "BUY" or "SELL"
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrderHistory(storedOrders);
  }, []);

  const handleTradeClick = () => {
    if (stockQuantity <= 0 || stockPrice <= 0) {
      alert("Please enter valid quantity and price.");
      return;
    }

    const newOrder = {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode, // BUY or SELL
      timestamp: new Date().toISOString(),
    };

    const updatedOrders = [...orderHistory, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrderHistory(updatedOrders);

    onClose();
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <div className="container" id="trade-window" draggable="true">
      {/* Toggle Buy / Sell */}
      <div className="trade-mode-toggle" style={{ marginBottom: 10 }}>
        <button className={mode === "BUY" ? "active" : ""} onClick={() => setMode("BUY")}>
          Buy
        </button>
        <button className={mode === "SELL" ? "active" : ""} onClick={() => setMode("SELL")}>
          Sell
        </button>
      </div>

      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              min="0"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
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
          <button className="btn btn-blue" onClick={handleTradeClick}>
            {mode}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeActionWindow;
