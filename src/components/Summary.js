import React, { useEffect, useState } from "react";

const Summary = () => {
  const [summary, setSummary] = useState({
    investment: 0,
    currentValue: 0,
    pl: 0,
    plPercent: 0,
    holdingsCount: 0,
  });

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const holdingsMap = {};

    storedOrders.forEach((order) => {
      const name = order.name;
      const qty = Number(order.qty);
      const price = Number(order.price);

      if (!holdingsMap[name]) {
        holdingsMap[name] = {
          qty: 0,
          totalCost: 0,
          latestPrice: price,
        };
      }

      if (order.mode === "BUY") {
        holdingsMap[name].qty += qty;
        holdingsMap[name].totalCost += qty * price;
        holdingsMap[name].latestPrice = price;
      } else if (order.mode === "SELL") {
        holdingsMap[name].qty -= qty;
        holdingsMap[name].totalCost -= qty * price;
        holdingsMap[name].latestPrice = price;
      }
    });

    const holdings = Object.values(holdingsMap).filter((h) => h.qty > 0);

    const investment = holdings.reduce((sum, h) => sum + h.totalCost, 0);
    const currentValue = holdings.reduce(
      (sum, h) => sum + h.qty * h.latestPrice,
      0
    );
    const pl = currentValue - investment;
    const plPercent = investment > 0 ? (pl / investment) * 100 : 0;

    setSummary({
      investment,
      currentValue,
      pl,
      plPercent,
      holdingsCount: holdings.length,
    });
  }, []);

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance <span>3.74k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({summary.holdingsCount})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={summary.pl >= 0 ? "profit" : "loss"}>
              {Math.abs(summary.pl).toFixed(2) / 1000}k{" "}
              <small>
                {summary.pl >= 0 ? "+" : "-"}
                {summary.plPercent.toFixed(2)}%
              </small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{(summary.currentValue / 1000).toFixed(2)}k</span>
            </p>
            <p>
              Investment <span>{(summary.investment / 1000).toFixed(2)}k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
