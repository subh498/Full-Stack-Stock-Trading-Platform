import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import { API_BASE_URL } from "../config";
import { watchlist } from "../data/data";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const generalContext = useContext(GeneralContext);

  const initialStock = watchlist.find((item) => item.name === uid);
  const defaultPrice = initialStock ? initialStock.price : 100.0;

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(defaultPrice);
  const [loading, setLoading] = useState(false);

  const isSell = String(mode).toUpperCase() === "SELL";

  const handleOrderClick = async (e) => {
    if (e) e.preventDefault();
    const qty = Number(stockQuantity);
    const price = Number(stockPrice);

    if (isNaN(qty) || qty <= 0) {
      alert("Please enter a valid quantity of 1 or more.");
      return;
    }
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid stock price greater than 0.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/newOrder`, {
        name: uid,
        qty,
        price,
        mode: isSell ? "SELL" : "BUY",
      });

      generalContext.closeBuyWindow();
    } catch (err) {
      console.error("Order submission failed:", err);
      alert(
        err.response?.data?.error ||
          "Failed to place order. Please verify your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (e) => {
    if (e) e.preventDefault();
    generalContext.closeBuyWindow();
  };

  const marginRequired = (Number(stockQuantity || 0) * Number(stockPrice || 0) * 0.2).toFixed(2);

  return (
    <div className="container" id="buy-window" draggable="true">
      <div
        className="header"
        style={{ background: isSell ? "#ff5722" : "#4184f3" }}
      >
        <h3>
          {isSell ? "Sell" : "Buy"} {uid} <span>x {stockQuantity} Qty</span>
        </h3>
      </div>
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹{marginRequired}</span>
        <div>
          <Link
            className={`btn ${isSell ? "btn-red" : "btn-blue"}`}
            onClick={loading ? undefined : handleOrderClick}
            style={{ opacity: loading ? 0.7 : 1, pointerEvents: loading ? "none" : "auto" }}
          >
            {loading ? "Placing..." : isSell ? "Sell" : "Buy"}
          </Link>
          <Link to="#" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
