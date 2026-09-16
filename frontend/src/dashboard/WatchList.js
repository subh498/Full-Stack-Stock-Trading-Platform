import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import GeneralContext from "./GeneralContext";
import DoughnutChart from "./DoughnutChart";

const fallbackStocks = [
  { name: "INFY", price: 1555.45, percent: "-1.60%", isDown: true },
  { name: "TCS", price: 3194.8, percent: "-0.25%", isDown: true },
  { name: "RELIANCE", price: 2112.4, percent: "+1.44%", isDown: false },
  { name: "HDFCBANK", price: 1522.35, percent: "+0.11%", isDown: false },
  { name: "TATAPOWER", price: 124.15, percent: "+19.15%", isDown: false },
  { name: "SBIN", price: 430.2, percent: "-0.34%", isDown: true },
  { name: "ITC", price: 207.9, percent: "+0.80%", isDown: false },
  { name: "WIPRO", price: 577.75, percent: "+0.32%", isDown: false },
  { name: "KPITTECH", price: 266.45, percent: "+3.54%", isDown: false },
  { name: "BHARTIARTL", price: 541.15, percent: "+2.99%", isDown: false },
  { name: "HINDUNILVR", price: 2417.4, percent: "+0.21%", isDown: false },
];

const WatchList = () => {
  const [stocks, setStocks] = useState(fallbackStocks);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/watchlist`);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setStocks(res.data);
      }
    } catch (err) {
      // Keep existing
    }
  };

  useEffect(() => {
    fetchWatchlist();
    const interval = setInterval(fetchWatchlist, 7000);
    return () => clearInterval(interval);
  }, []);

  const filtered = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const doughnutData = {
    labels: stocks.slice(0, 6).map((s) => s.name),
    datasets: [
      {
        data: stocks.slice(0, 6).map((s) => s.price),
        backgroundColor: [
          "#387ed1",
          "#ff5722",
          "#4caf50",
          "#f59e0b",
          "#8b5cf6",
          "#ec4899",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, bse, reliance..."
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="counts">
          {filtered.length}/{stocks.length}
        </span>
      </div>

      <ul className="list">
        {filtered.length === 0 ? (
          <li style={{ padding: "20px", textAlign: "center", color: "var(--text-muted)" }}>
            No instruments found
          </li>
        ) : (
          filtered.map((stock, index) => (
            <WatchListItem stock={stock} key={stock.name || index} />
          ))
        )}
      </ul>

      <div style={{ borderTop: "1px solid var(--border-subtle, #eee)" }}>
        <DoughnutChart data={doughnutData} />
      </div>
    </div>
  );
};

const WatchListItem = ({ stock }) => {
  const [hovered, setHovered] = useState(false);
  const { openBuyWindow } = useContext(GeneralContext);

  const isDown = stock.isDown ?? (stock.percent && stock.percent.startsWith("-"));

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="item">
        <p className={`item-name ${isDown ? "down" : "up"}`}>{stock.name}</p>
        <div className="itemInfo">
          <span className={`percent ${isDown ? "down" : "up"}`}>
            {stock.percent}
          </span>
          <span style={{ fontSize: "0.75rem", color: isDown ? "var(--accent-bear)" : "var(--accent-bull)" }}>
            {isDown ? "▼" : "▲"}
          </span>
          <span className="price">₹{Number(stock.price).toFixed(2)}</span>
        </div>
      </div>

      {hovered && (
        <div className="actions">
          <button
            type="button"
            className="btn-watchlist-buy"
            onClick={() => openBuyWindow(stock.name, "BUY", stock.price)}
          >
            B
          </button>
          <button
            type="button"
            className="btn-watchlist-sell"
            onClick={() => openBuyWindow(stock.name, "SELL", stock.price)}
          >
            S
          </button>
          <button
            type="button"
            className="btn-watchlist-icon"
            title="Market depth & charts"
            onClick={() => openBuyWindow(stock.name, "BUY", stock.price)}
          >
            📊
          </button>
        </div>
      )}
    </li>
  );
};

export default WatchList;
