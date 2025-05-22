import React from "react";
import { Link } from "react-router-dom";
const Funds = () => {
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
                <div>
                  <h5 className="mb-3">Summary</h5>
                  <div className="mb-3">
                    <p className="mb-1 text-muted">Available Margin</p>
                    <h4 className="text-success">₹ 4,043.10</h4>
                  </div>
                  <div className="mb-3">
                    <p className="mb-1 text-muted">Used Margin</p>
                    <h4 className="text-danger">₹ 3,757.30</h4>
                  </div>
                  <div className="mb-3">
                    <p className="mb-1 text-muted">Available Cash</p>
                    <h4 className="text-success">₹ 4,043.10</h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Table */}
            <div className="col-lg-8">
              <div className="table-responsive bg-white rounded shadow-sm">
                <table className="table mb-0">
                  <tbody>
                    <tr>
                      <td>Opening Balance</td>
                      <td>₹ 4,043.10</td>
                    </tr>
                    <tr>
                      <td>Opening Balance (F&O)</td>
                      <td>₹ 3,736.40</td>
                    </tr>
                    <tr>
                      <td>Payin</td>
                      <td>₹ 4,064.00</td>
                    </tr>
                    <tr>
                      <td>SPAN</td>
                      <td>₹ 0.00</td>
                    </tr>
                    <tr>
                      <td>Delivery Margin</td>
                      <td>₹ 0.00</td>
                    </tr>
                    <tr>
                      <td>Exposure</td>
                      <td>₹ 0.00</td>
                    </tr>
                    <tr>
                      <td>Options Premium</td>
                      <td>₹ 0.00</td>
                    </tr>
                    <tr>
                      <th className="pt-4">Collateral (Liquid funds)</th>
                      <th className="pt-4">₹ 0.00</th>
                    </tr>
                    <tr>
                      <td>Collateral (Equity)</td>
                      <td>₹ 0.00</td>
                    </tr>
                    <tr>
                      <td>Total Collateral</td>
                      <td>₹ 0.00</td>
                    </tr>
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

