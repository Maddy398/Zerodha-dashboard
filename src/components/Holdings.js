import React, { useState, useEffect } from "react";
import axios from "axios";
import VerticalGraph from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {
    axios
      .get("https://zerodha-backend-0zxr.onrender.com/allHoldings")
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((err) => console.error("Error fetching holdings:", err));
  }, []);

  // Build labels and dataset for the chart
  const labels = allHoldings.map((h) => h.name);
  const data = {
    labels,
    datasets: [
      {
        label: "LTP (₹)",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: labels.map((_, i) =>
          // Cycle through a few pleasant, translucent colors
          ["rgba(54,162,235,0.6)", "rgba(75,192,192,0.6)", "rgba(153,102,255,0.6)"][i % 3]
        ),
        borderColor: labels.map((_, i) =>
          ["rgba(54,162,235,1)", "rgba(75,192,192,1)", "rgba(153,102,255,1)"][i % 3]
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#f2f5f9", minHeight: "100vh", padding: "2rem" }}
    >
      <div className="row mb-4">
        <div className="col-12">
          <h3 className="text-center fw-bold">
            Holdings <span className="text-primary">({allHoldings.length})</span>
          </h3>
        </div>
      </div>

      {/* Card‐style table */}
      <div className="row mb-5 justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Instrument</th>
                      <th>Qty.</th>
                      <th>Avg. cost (₹)</th>
                      <th>LTP (₹)</th>
                      <th>Cur. val (₹)</th>
                      <th>P&amp;L (₹)</th>
                      <th>Net chg. (₹)</th>
                      <th>Day chg. (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allHoldings.map((stock, idx) => {
                      const curValue = stock.price * stock.qty;
                      const pnl = curValue - stock.avg * stock.qty;
                      const isProfit = pnl >= 0;
                      const profClass = isProfit ? "text-success" : "text-danger";
                      const dayClass = stock.isLoss ? "text-danger" : "text-success";

                      return (
                        <tr key={idx}>
                          <td className="fw-medium">{stock.name}</td>
                          <td>{stock.qty}</td>
                          <td>{stock.avg.toFixed(2)}</td>
                          <td>{stock.price.toFixed(2)}</td>
                          <td>{curValue.toFixed(2)}</td>
                          <td className={profClass}>{pnl.toFixed(2)}</td>
                          <td className={profClass}>{stock.net}</td>
                          <td className={dayClass}>{stock.day}</td>
                        </tr>
                      );
                    })}
                    {allHoldings.length === 0 && (
                      <tr>
                        <td colSpan="8" className="text-center text-muted">
                          No holdings to display.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-muted">Total Investment</h5>
              <h3 className="fw-bold">₹ 29,875.<span className="text-secondary">55</span></h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-muted">Current Value</h5>
              <h3 className="fw-bold">₹ 31,428.<span className="text-secondary">95</span></h3>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-muted">P&amp;L</h5>
              <h3 className="fw-bold text-success">₹ 1,553.40 <small>(+5.20%)</small></h3>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Bar Chart */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Holdings LTP Bar Chart</h5>
              <VerticalGraph data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holdings;
