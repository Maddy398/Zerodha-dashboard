import React, { useEffect, useState } from "react";

const Funds = () => {
  // In a real app, these values would come from props, context, or an API
  const summary = {
    availableMargin: 4043,
    usedMargin: 3757,
    availableCash: 4043,
  };

  const breakdown = [
    { label: "Opening Balance", value: 4043.10 },
    { label: "Opening Balance (F&O)", value: 3736.40 },
    { label: "Payin", value: 4064.00 },
    { label: "SPAN", value: 0.00 },
    { label: "Delivery Margin", value: 0.00 },
    { label: "Exposure", value: 0.00 },
    { label: "Options Premium", value: 0.00 },
    { label: "Collateral (Liquid funds)", value: 0.00, isHeader: true },
    { label: "Collateral (Equity)", value: 0.00 },
    { label: "Total Collateral", value: 0.00 },
  ];

  return (
    <div
      className="container-fluid bg-light d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", padding: "2rem" }}
    >
      <div className="card w-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Equity Funds & Margins</h2>
          <div className="row">
            {/* Left Column: Summary */}
            <div className="col-lg-4 mb-4">
              <div className="bg-white p-4 rounded shadow-sm h-100 d-flex flex-column justify-content-between">
                <h5 className="mb-3">Margin Summary</h5>
                <div className="mb-3">
                  <p className="mb-1 text-muted">Available Margin</p>
                  <h4 className="text-success">₹ {summary.availableMargin}</h4>
                </div>
                <div className="mb-3">
                  <p className="mb-1 text-muted">Used Margin</p>
                  <h4 className="text-danger">₹ {summary.usedMargin}</h4>
                </div>
                <div className="mb-3">
                  <p className="mb-1 text-muted">Available Cash</p>
                  <h4 className="text-success">₹ {summary.availableCash}</h4>
                </div>
              </div>
            </div>

            {/* Right Column: Table */}
            <div className="col-lg-8">
              <div className="table-responsive bg-white rounded shadow-sm">
                <table className="table mb-0">
                  <tbody>
                    {breakdown.map((item, index) => (
                      <tr key={index}>
                        {item.isHeader ? (
                          <>
                            <th className="pt-4">{item.label}</th>
                            <th className="pt-4">₹{item.value}</th>
                          </>
                        ) : (
                          <>
                            <td>{item.label}</td>
                            <td>₹{item.value}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;
