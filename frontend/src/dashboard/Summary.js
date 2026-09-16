import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";

const Summary = () => {
  const { user } = useAuth();
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${API_BASE_URL}/api/holdings`)
      .then((res) => {
        if (isMounted) {
          setHoldings(Array.isArray(res.data) ? res.data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Summary error:", err);
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const availableMargin = Number(user?.funds || 0);

  const totalInvestment = holdings.reduce(
    (sum, item) => sum + Number(item.avg || 0) * Number(item.qty || 0),
    0
  );
  const currentValue = holdings.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0),
    0
  );
  const totalPL = currentValue - totalInvestment;
  const totalPLPercentage =
    totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : "0.00";
  const isProfit = totalPL >= 0;

  const formatCurrency = (val) => {
    return Number(val).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="summary-container">
      <div className="username d-flex align-items-center justify-content-between">
        <h6>Hi, {user?.fullName || user?.username || "Trader"}! 👋</h6>
        <span className="badge bg-success-subtle text-success py-1 px-2 small">
          Active Account
        </span>
      </div>

      <hr className="divider" />

      {/* EQUITY SECTION */}
      <div className="summary-section">
        <h4>Equity</h4>
        <div className="summary-grid">
          <div className="summary-card">
            <h3 style={{ color: "var(--accent-primary, #387ed1)" }}>
              ₹{formatCurrency(availableMargin)}
            </h3>
            <p>Margin available</p>
          </div>

          <div className="summary-details">
            <div className="detail-row">
              <span>Margins used</span>
              <span>₹{formatCurrency(totalInvestment)}</span>
            </div>
            <div className="detail-row">
              <span>Opening balance</span>
              <span>₹{formatCurrency(availableMargin + totalInvestment)}</span>
            </div>
            <div className="detail-row">
              <span>Quick Action</span>
              <Link to="/dashboard/funds" style={{ fontWeight: 600, fontSize: "0.82rem" }}>
                + Add / Withdraw Funds &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* HOLDINGS SECTION */}
      <div className="summary-section">
        <h4>Holdings ({loading ? "..." : holdings.length})</h4>
        <div className="summary-grid">
          <div className="summary-card">
            <h3 style={{ color: isProfit ? "var(--accent-bull, #4caf50)" : "var(--accent-bear, #df514c)" }}>
              {isProfit ? "+" : ""}
              ₹{formatCurrency(totalPL)}{" "}
              <small style={{ fontSize: "1rem", fontWeight: 600 }}>
                ({isProfit ? "+" : ""}
                {totalPLPercentage}%)
              </small>
            </h3>
            <p>Total P&L</p>
          </div>

          <div className="summary-details">
            <div className="detail-row">
              <span>Current Value</span>
              <span>₹{formatCurrency(currentValue)}</span>
            </div>
            <div className="detail-row">
              <span>Total Investment</span>
              <span>₹{formatCurrency(totalInvestment)}</span>
            </div>
            <div className="detail-row">
              <span>Portfolio Breakdown</span>
              <Link to="/dashboard/holdings" style={{ fontWeight: 600, fontSize: "0.82rem" }}>
                View Holdings Detail &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
