import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { API_BASE_URL } from "../config";

// import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/allHoldings`)
      .then((res) => {
        setAllHoldings(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching holdings:", err);
        setError("Failed to load holdings from database.");
        setLoading(false);
      });
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

  const labels = allHoldings.map((subArray) => subArray["name"]);

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

      {loading ? (
        <div style={{ padding: "30px 10px", color: "#666" }}>
          <p>Loading holdings from database...</p>
        </div>
      ) : error ? (
        <div style={{ padding: "20px 10px", color: "#f44336" }}>
          <p>{error}</p>
        </div>
      ) : (
        <>
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
                    <td colSpan="8" style={{ textAlign: "center", color: "#888", padding: "20px" }}>
                      No active holdings. Seed your database or buy stocks from Watchlist.
                    </td>
                  </tr>
                ) : (
                  allHoldings.map((stock, index) => {
                    const curValue = Number(stock.price || 0) * Number(stock.qty || 0);
                    const investment = Number(stock.avg || 0) * Number(stock.qty || 0);
                    const pnl = curValue - investment;
                    const isProfit = pnl >= 0.0;
                    const profClass = isProfit ? "profit" : "loss";
                    const dayClass = stock.isLoss ? "loss" : "profit";

                    return (
                      <tr key={index}>
                        <td>{stock.name}</td>
                        <td>{stock.qty}</td>
                        <td>{Number(stock.avg).toFixed(2)}</td>
                        <td>{Number(stock.price).toFixed(2)}</td>
                        <td>{curValue.toFixed(2)}</td>
                        <td className={profClass}>
                          {isProfit ? "+" : ""}
                          {pnl.toFixed(2)}
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

          <div className="row">
            <div className="col">
              <h5>
                {totalInvestment.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h5>
              <p>Total investment</p>
            </div>
            <div className="col">
              <h5>
                {currentValue.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h5>
              <p>Current value</p>
            </div>
            <div className="col">
              <h5 className={isTotalProfit ? "profit" : "loss"}>
                {isTotalProfit ? "+" : ""}
                {totalPL.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                ({isTotalProfit ? "+" : ""}
                {totalPLPercentage}%)
              </h5>
              <p>P&L</p>
            </div>
          </div>

          {allHoldings.length > 0 && <VerticalGraph data={data} />}
        </>
      )}
    </>
  );
};

export default Holdings;
