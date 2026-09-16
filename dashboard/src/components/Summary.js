import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/allHoldings`)
      .then((res) => {
        setHoldings(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Summary error:", err);
        setLoading(false);
      });
  }, []);

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

  const formatK = (val) => {
    return (Math.abs(val) / 1000).toFixed(2) + "k";
  };

  return (
    <>
      <div className="username">
        <h6>Hi, Trader!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>4.04k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{(totalInvestment > 0 ? formatK(totalInvestment) : "0")}</span>{" "}
            </p>
            <p>
              Opening balance <span>4.04k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({loading ? "..." : holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {isProfit ? "+" : "-"}
              {formatK(totalPL)}{" "}
              <small>
                {isProfit ? "+" : ""}
                {totalPLPercentage}%
              </small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatK(currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{formatK(totalInvestment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
