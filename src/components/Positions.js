import React, { useEffect, useState } from "react";
import { pograph } from "./postiongraph";

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

  // Prepare combined chart data
  const labels = positions.map((p) => p.name);
  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Quantity",
        data: positions.map((p) => p.qty),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        yAxisID: "y",
      },
      {
        type: "line",
        label: "Avg Price",
        data: positions.map((p) => p.avg.toFixed(2)),
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y1",
        tension: 0.3,
      },
      // Optionally, you can add Latest Price as another dataset
      {
        type: "line",
        label: "Latest Price",
        data: positions.map((p) => p.price.toFixed(2)),
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: false,
        yAxisID: "y1",
        tension: 0.3,
      },
    ],
  };

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
              <th>Day % Chg.</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((stock, index) => {
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
                  <td className={profClass}>{(curValue - stock.avg * stock.qty).toFixed(2)}</td>
                  <td className={dayClass}>{stock.dayChange}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Render combined vertical graph */}
      <VerticalGraph data={data} />
    </>
  );
};

export default Positions;
