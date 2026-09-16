import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const defaultPositions = [
  {
    product: "CNC",
    name: "EVEREADY",
    qty: 2,
    avg: 316.27,
    price: 312.35,
    net: "+0.58%",
    day: "-1.24%",
    isLoss: true,
  },
  {
    product: "CNC",
    name: "JUBLFOOD",
    qty: 1,
    avg: 3124.75,
    price: 3082.65,
    net: "+10.04%",
    day: "-1.35%",
    isLoss: true,
  },
];

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/positions`)
      .then((res) => {
        setAllPositions(
          Array.isArray(res.data) && res.data.length > 0 ? res.data : defaultPositions
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching positions:", err);
        setAllPositions(defaultPositions);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table-container">
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    Loading positions...
                  </td>
                </tr>
              ) : (
                allPositions.map((stock, index) => {
                  const curVal = stock.price * stock.qty;
                  const isProfit = curVal - stock.avg * stock.qty >= 0.0;
                  const profClass = isProfit ? "profit" : "loss";
                  const dayClass = stock.isLoss ? "loss" : "profit";

                  return (
                    <tr key={index}>
                      <td>
                        <span className="badge bg-light text-dark border">{stock.product}</span>
                      </td>
                      <td>
                        <strong>{stock.name}</strong>
                      </td>
                      <td>{stock.qty}</td>
                      <td>₹{Number(stock.avg).toFixed(2)}</td>
                      <td>₹{Number(stock.price).toFixed(2)}</td>
                      <td className={profClass}>
                        {(curVal - stock.avg * stock.qty).toFixed(2)}
                      </td>
                      <td className={dayClass}>{stock.day}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Positions;
