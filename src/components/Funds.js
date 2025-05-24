import React, { useEffect, useState } from "react";

const Funds = () => {
  const [fundsData, setFundsData] = useState({});

  useEffect(() => {
    // Try to get funds data from localStorage
    const storedData = localStorage.getItem("funds");
    if (storedData) {
      try {
        setFundsData(JSON.parse(storedData));
      } catch {
        setFundsData({});
      }
    } else {
      // Default fallback data
      setFundsData({
        availableMargin: 4043,
        usedMargin: 3757,
        availableCash: 4043,
        "Opening Balance": 4043.10,
        "Opening Balance (F&O)": 3736.40,
        Payin: 4064.0,
        SPAN: 0.0,
        "Delivery Margin": 0.0,
        Exposure: 0.0,
        "Options Premium": 0.0,
        "Collateral (Liquid funds)": 0.0,
        "Collateral (Equity)": 0.0,
        "Total Collateral": 0.0,
      });
    }
  }, []);

  return (
    <div
      className="container"
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "1rem",
        boxShadow: "0 0 12px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Equity Funds & Margins
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "1rem",
        }}
      >
        <tbody>
          {Object.entries(fundsData).map(([key, value]) => (
            <tr
              key={key}
              style={{
                borderBottom: "1px solid #ddd",
                backgroundColor:
                  key.toLowerCase().includes("collateral") ? "#f9f9f9" : "white",
              }}
            >
              <td
                style={{
                  padding: "12px 8px",
                  fontWeight: key.toLowerCase().includes("collateral")
                    ? "600"
                    : "400",
                }}
              >
                {key}
              </td>
              <td
                style={{
                  padding: "12px 8px",
                  textAlign: "right",
                  fontWeight: key.toLowerCase().includes("collateral")
                    ? "600"
                    : "400",
                }}
              >
                ₹ {Number(value).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Funds;
