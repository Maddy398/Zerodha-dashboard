import React, { useEffect, useState } from "react";

const Summary = () => {
  const [holdingsMap, setHoldingsMap] = useState({});
  const [summary, setSummary] = useState({
    investment: 0,
    currentValue: 0,
    pl: 0,
    plPercent: 0,
    holdingsCount: 0,
  });

  // Load holdingsMap from localStorage orders initially
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const map = {};

    storedOrders.forEach((order) => {
      const name = order.name;
      const qty = Number(order.qty);
      const price = Number(order.price);

      if (!map[name]) {
        map[name] = {
          qty: 0,
          totalCost: 0,
          latestPrice: price,
        };
      }

      if (order.mode === "BUY") {
        map[name].qty += qty;
        map[name].totalCost += qty * price;
        map[name].latestPrice = price;
      } else if (order.mode === "SELL") {
        map[name].qty -= qty;
        map[name].totalCost -= qty * price;
        map[name].latestPrice = price;
      }
    });

    // Remove zero or negative qty stocks
    Object.keys(map).forEach((key) => {
      if (map[key].qty <= 0) {
        delete map[key];
      }
    });

    setHoldingsMap(map);
  }, []);

  // Function to randomly update prices ±5%
  const updatePricesRandomly = (map) => {
    const newMap = {};
    Object.entries(map).forEach(([name, stock]) => {
      const randomPercent = (Math.random() * 10 - 5) / 100; // -5% to +5%
      const newPrice = +(stock.latestPrice * (1 + randomPercent)).toFixed(2);
      newMap[name] = {
        ...stock,
        latestPrice: newPrice,
      };
    });
    return newMap;
  };

  // Update summary whenever holdingsMap changes
  useEffect(() => {
    if (!holdingsMap || Object.keys(holdingsMap).length === 0) {
      setSummary({
        investment: 0,
        currentValue: 0,
        pl: 0,
        plPercent: 0,
        holdingsCount: 0,
      });
      return;
    }

    const holdings = Object.values(holdingsMap);

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
  }, [holdingsMap]);

  // Setup interval to update prices every 10 seconds
  useEffect(() => {
    if (!holdingsMap || Object.keys(holdingsMap).length === 0) return;

    const interval = setInterval(() => {
      setHoldingsMap((prevMap) => updatePricesRandomly(prevMap));
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, [holdingsMap]);

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
              {(Math.abs(summary.pl) / 1000).toFixed(2)}k{" "}
              <small>
                {summary.pl >= 0 ? "+" : "-"}
                {Math.abs(summary.plPercent).toFixed(2)}%
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
