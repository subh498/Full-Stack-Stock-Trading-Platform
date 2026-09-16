import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import VerticalGraph from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHoldings = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/holdings`)
      .then((res) => {
        setAllHoldings(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
        setError("Failed to load holdings from database.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + Number(stock.avg || 0) * Number(stock.qty || 0),
    0
  );
  const currentValue = allHoldings.reduce(
    (acc, stock) => acc + Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );
  const totalPL = currentValue - totalInvestment;
  const totalPLPercentage =
    totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : "0.00";
  const isTotalProfit = totalPL >= 0;

  const chartData = {
    labels: allHoldings.map((s) => s.name),
    datasets: [
      {
        label: "Current Value (₹)",
        data: allHoldings.map((s) => (Number(s.price || 0) * Number(s.qty || 0)).toFixed(2)),
        backgroundColor: allHoldings.map((s) => {
          const pl = Number(s.price || 0) - Number(s.avg || 0);
          return pl >= 0 ? "rgba(76, 175, 80, 0.6)" : "rgba(223, 81, 76, 0.6)";
        }),
        borderColor: allHoldings.map((s) => {
          const pl = Number(s.price || 0) - Number(s.avg || 0);
          return pl >= 0 ? "#4caf50" : "#df514c";
        }),
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="title mb-0">Holdings ({allHoldings.length})</h3>
        <button
          onClick={fetchHoldings}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
          style={{ fontSize: "0.8rem" }}
          title="Refresh holdings"
        >
          <span>🔄</span> Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ padding: "40px 10px", textAlign: "center", color: "var(--text-muted)" }}>
          <p>Loading portfolio holdings from database...</p>
        </div>
      ) : error ? (
        <div style={{ padding: "20px", color: "var(--accent-bear)" }}>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="order-table-container">
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
                  {allHoldings.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{ textAlign: "center", color: "var(--text-muted)", padding: "30px" }}>
                        No active holdings. Buy stocks from the Watchlist to build your portfolio!
                      </td>
                    </tr>
                  ) : (
                    allHoldings.map((stock, index) => {
                      const curVal = Number(stock.price || 0) * Number(stock.qty || 0);
                      const investment = Number(stock.avg || 0) * Number(stock.qty || 0);
                      const pnl = curVal - investment;
                      const isProfit = pnl >= 0.0;
                      const profClass = isProfit ? "profit" : "loss";
                      const dayClass = stock.isLoss ? "loss" : "profit";

                      return (
                        <tr key={stock._id || index}>
                          <td>
                            <strong>{stock.name}</strong>
                          </td>
                          <td>{stock.qty}</td>
                          <td>₹{Number(stock.avg).toFixed(2)}</td>
                          <td>₹{Number(stock.price).toFixed(2)}</td>
                          <td>₹{curVal.toFixed(2)}</td>
                          <td className={profClass}>
                            {isProfit ? "+" : ""}₹{pnl.toFixed(2)}
                          </td>
                          <td className={profClass}>{stock.net || "0.00%"}</td>
                          <td className={dayClass}>{stock.day || "0.00%"}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="portfolio-stats-row">
            <div className="portfolio-stat-box">
              <h5>
                ₹
                {totalInvestment.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h5>
              <p>Total Investment</p>
            </div>
            <div className="portfolio-stat-box">
              <h5>
                ₹
                {currentValue.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h5>
              <p>Current Value</p>
            </div>
            <div className="portfolio-stat-box">
              <h5 style={{ color: isTotalProfit ? "var(--accent-bull)" : "var(--accent-bear)" }}>
                {isTotalProfit ? "+" : ""}₹
                {totalPL.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                <small style={{ fontSize: "0.95rem" }}>
                  ({isTotalProfit ? "+" : ""}
                  {totalPLPercentage}%)
                </small>
              </h5>
              <p>Total P&L</p>
            </div>
          </div>

          {allHoldings.length > 0 && <VerticalGraph data={chartData} />}
        </>
      )}
    </>
  );
};

export default Holdings;
