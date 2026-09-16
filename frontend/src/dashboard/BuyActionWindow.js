import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";

const BuyActionWindow = ({ uid, mode = "BUY", defaultPrice = 100, onSuccess }) => {
  const { user, updateUserFunds } = useAuth();

  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(defaultPrice);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isSell = String(mode).toUpperCase() === "SELL";
  const numQty = Math.max(1, parseInt(qty) || 1);
  const numPrice = Math.max(0.01, parseFloat(price) || 0.01);
  const totalAmount = (numQty * numPrice).toFixed(2);
  const availableFunds = user?.funds || 0;

  const handleOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!isSell && numQty * numPrice > availableFunds) {
      setError(`Insufficient funds! Required: ₹${totalAmount}, Available: ₹${availableFunds.toFixed(2)}`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/orders/new`, {
        name: uid,
        qty: numQty,
        price: numPrice,
        mode: isSell ? "SELL" : "BUY",
      });

      if (res.data?.success) {
        if (res.data.remainingFunds !== null && res.data.remainingFunds !== undefined) {
          updateUserFunds(res.data.remainingFunds);
        }
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error("Order submission failed:", err);
      setError(err.response?.data?.error || "Order execution failed. Please verify connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="kite-modal-overlay" onClick={onSuccess}>
      <div className="kite-order-window" onClick={(e) => e.stopPropagation()}>
        <div className={`kite-order-header ${isSell ? "sell" : "buy"}`}>
          <h3>
            {isSell ? "Sell" : "Buy"} {uid} <small style={{ fontSize: "0.8rem", opacity: 0.9 }}>x {numQty} Qty</small>
          </h3>
          <button type="button" className="close-btn" onClick={onSuccess}>
            &times;
          </button>
        </div>

        {error && (
          <div
            className="alert alert-danger m-3 py-2 px-3 small text-center"
            style={{ borderRadius: "4px" }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleOrder}>
          <div className="kite-order-body">
            <div className="kite-order-inputs">
              <div className="kite-input-group">
                <label>Quantity</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div className="kite-input-group">
                <label>Price (₹)</label>
                <input
                  type="number"
                  step="0.05"
                  min="0.05"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary, #666)",
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
              }}
            >
              <span>Order Value: <strong>₹{totalAmount}</strong></span>
              <span>Available Cash: <strong>₹{availableFunds.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</strong></span>
            </div>
          </div>

          <div className="kite-order-footer">
            <div className="margin-info">
              Margin required: <span>₹{totalAmount}</span>
            </div>
            <div className="action-btns">
              <button
                type="submit"
                className={isSell ? "btn-watchlist-sell" : "btn-watchlist-buy"}
                style={{ padding: "8px 20px", fontSize: "0.85rem" }}
                disabled={submitting}
              >
                {submitting ? "Placing..." : isSell ? "Execute Sell" : "Execute Buy"}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={onSuccess}
                disabled={submitting}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyActionWindow;
