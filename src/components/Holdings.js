import React, { useEffect, useState } from "react";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const holdingsMap = {};

    storedOrders.forEach((order) => {
      const name = order.name;
      const qty = Number(order.qty);
      const price = Number(order.price);

      if (!holdingsMap[name]) {
        holdingsMap[name] = {
          name,
          qty: 0,
          totalCost: 0,
          price: price, // latest price assumed
          lastPrice: price,
        };
      }

      if (order.mode === "BUY") {
        holdingsMap[name].qty += qty;
        holdingsMap[name].totalCost += qty * price;
        holdingsMap[name].lastPrice = price;
      } else if (order.mode === "SELL") {
        holdingsMap[name].qty -= qty;
        // totalCost should NOT be reduced here because cost basis stays the same for remaining stocks
        holdingsMap[name].lastPrice = price;
      }
    });

    // Filter stocks with positive quantity
    const formattedHoldings = Object.values(holdingsMap)
      .filter((h) => h.qty > 0)
      .map((h) => {
        const avgCost = h.totalCost / h.qty;
        const isLoss = h.lastPrice < avgCost;

        return {
          name: h.name,
          qty: h.qty,
          avg: avgCost,
          price: h.lastPrice,
          net: "+0.00", // You can add your net change calculation here
          day: "+0.00", // You can add your daily change calculation here
          isLoss,
        };
      });

    setAllHoldings(formattedHoldings);
  }, []);

  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );

  const currentValue = allHoldings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );

  const totalPL = currentValue - totalInvestment;
  const totalPLPercent = totalInvestment
    ? ((totalPL / totalInvestment) * 100).toFixed(2)
    : "0.00";

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "LTP (Last Traded Price)",
        data: allHoldings.map((stock) => stock.price),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        type: "line",
      },
      {
        label: "Avg. Cost",
        data: allHoldings.map((stock) => stock.avg),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        type: "line",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pl = curValue - stock.avg * stock.qty;
              const isProfit = pl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>{pl.toFixed(2)}</td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toFixed(2).split(".")[0]}.
            <span>{totalInvestment.toFixed(2).split(".")[1]}</span>
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {currentValue.toFixed(2).split(".")[0]}.
            <span>{currentValue.toFixed(2).split(".")[1]}</span>
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>
            {totalPL.toFixed(2)} ({totalPLPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
