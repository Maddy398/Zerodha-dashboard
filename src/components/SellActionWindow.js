import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css"; // Reuse styles

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [maxSellQty, setMaxSellQty] = useState(0);

  const { closeTradeWindow } = useContext(GeneralContext);

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const totalBought = allOrders
      .filter((order) => order.name === uid && order.mode === "BUY")
      .reduce((sum, order) => sum + Number(order.qty), 0);

    const totalSold = allOrders
      .filter((order) => order.name === uid && order.mode === "SELL")
      .reduce((sum, order) => sum + Number(order.qty), 0);

    const availableQty = totalBought - totalSold;

    setMaxSellQty(availableQty);
    setStockQuantity(Math.min(availableQty, 1)); // default to 1 or available
  }, [uid]);

  const handleSellClick = () => {
    if (stockQuantity <= 0 || stockPrice <= 0) {
      alert("Please enter valid quantity and price.");
      return;
    }

    if (stockQuantity > maxSellQty) {
      alert(`You can only sell up to ${maxSellQty} shares of ${uid}`);
      return;
    }

    const newOrder = {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: "SELL",
      timestamp: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [...existingOrders, newOrder];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    closeTradeWindow();
  };

  const handleCancelClick = () => {
    closeTradeWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty. (Max: {maxSellQty})</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              max={maxSellQty}
              value={stockQuantity}
              onChange={(e) =>
                setStockQuantity(Math.min(Number(e.target.value), maxSellQty))
              }
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
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
          Margin released ₹{(stockQuantity * stockPrice).toFixed(2)}
        </span>
        <div>
          <Link to="#" className="btn btn-blue" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="#" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
