import React, { useEffect, useState } from "react";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Aggregate buy orders only (you can adapt this logic for SELL visibility)
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
          net: "+0.00",
          day: "+0.00",
          isLoss: false,
        };
      }

      if (order.mode === "BUY") {
        holdingsMap[name].qty += qty;
        holdingsMap[name].totalCost += qty * price;
        holdingsMap[name].price = price; // update latest price
      } else if (order.mode === "SELL") {
        holdingsMap[name].qty -= qty;
        holdingsMap[name].totalCost -= qty * price;
        holdingsMap[name].price = price;
      }
    });

    const formattedHoldings = Object.values(holdingsMap)
      .filter((h) => h.qty > 0)
      .map((h) => ({
        name: h.name,
        qty: h.qty,
        avg: h.totalCost / h.qty,
        price: h.price,
        net: "+0.00", // Placeholder
        day: "+0.00", // Placeholder
        isLoss: h.price < h.totalCost / h.qty,
      }));

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
  const totalPLPercent = ((totalPL / totalInvestment) * 100).toFixed(2);

  const labels = allHoldings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
              const isProfit = curValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
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

