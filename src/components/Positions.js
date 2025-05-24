import React, { useEffect, useState } from "react";

const Positions = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const map = {};

    storedOrders.forEach((order) => {
      const name = order.name;
      const qty = Number(order.qty);
      const price = Number(order.price);

      if (!map[name]) {
        map[name] = {
          name,
          product: "EQ",
          qty: 0,
          totalCost: 0,
          latestPrice: price,
          previousClose: price,
          dayChange: 0,
          isLoss: false,
        };
      }

      if (order.mode === "BUY") {
        map[name].qty += qty;
        map[name].totalCost += qty * price;
      } else if (order.mode === "SELL") {
        map[name].qty -= qty;
      }

      map[name].latestPrice = price;
    });

    const filteredPositions = Object.values(map).filter((p) => p.qty > 0);

    const finalPositions = filteredPositions.map((p) => {
      const avg = p.qty !== 0 ? p.totalCost / p.qty : 0;
      const dayChangePercent = ((p.latestPrice - p.previousClose) / p.previousClose) * 100;
      const pl = (p.latestPrice - avg) * p.qty;

      return {
        ...p,
        avg,
        price: p.latestPrice,
        dayChange: dayChangePercent.toFixed(2),
        isLoss: pl < 0,
      };
    });

    setPositions(finalPositions);
  }, []);

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table" style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>D%C</th>
            </tr>
          </thead>
          <tbody>
            {positions.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No positions to display
                </td>
              </tr>
            ) : (
              positions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const isProfit = curValue - stock.avg * stock.qty >= 0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.dayChange >= 0 ? "profit" : "loss";

                return (
                  <tr key={index}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - stock.avg * stock.qty).toFixed(2)}
                    </td>
                    <td >{stock.dayChange}%</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
