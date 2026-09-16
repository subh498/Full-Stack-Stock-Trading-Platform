import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";

const Funds = () => {
  const { user, updateUserFunds } = useAuth();
  const [fundsData, setFundsData] = useState({
    availableMargin: user?.funds || 100000,
    usedMargin: 0,
    availableCash: user?.funds || 100000,
    openingBalance: user?.funds || 100000,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("ADD"); // "ADD" or "WITHDRAW"
  const [amount, setAmount] = useState("10000");
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchFunds = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/funds`);
      if (res.data?.success) {
        setFundsData(res.data);
      }
    } catch (err) {
      console.error("Error loading funds:", err);
    }
  };

  useEffect(() => {
    fetchFunds();
  }, []);

  const openAddFunds = () => {
    setModalType("ADD");
    setAmount("10000");
    setMessage("");
    setError("");
    setModalOpen(true);
  };

  const openWithdraw = () => {
    setModalType("WITHDRAW");
    setAmount("5000");
    setMessage("");
    setError("");
    setModalOpen(true);
  };

  const handleFundAction = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid positive amount.");
      return;
    }

    if (modalType === "WITHDRAW" && parsedAmount > (user?.funds || 0)) {
      setError("Insufficient available cash for this withdrawal.");
      return;
    }

    setProcessing(true);
    try {
      const endpoint = modalType === "ADD" ? "/api/funds/add" : "/api/funds/withdraw";
      const res = await axios.post(`${API_BASE_URL}${endpoint}`, {
        amount: parsedAmount,
      });

      if (res.data?.success) {
        setMessage(res.data.message);
        if (res.data.newBalance !== undefined) {
          updateUserFunds(res.data.newBalance);
        }
        await fetchFunds();
        setTimeout(() => {
          setModalOpen(false);
        }, 1200);
      }
    } catch (err) {
      console.error("Fund action failed:", err);
      setError(err.response?.data?.error || "Transaction failed. Check connection.");
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (val) => {
    return Number(val || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const currentAvailable = user?.funds !== undefined ? user.funds : fundsData.availableMargin;

  return (
    <>
      <div className="funds-action-bar">
        <p>Instant, zero-cost fund transfers via UPI & Netbanking</p>
        <div className="btns-wrap">
          <button type="button" onClick={openAddFunds} className="btn-kite-green">
            + Add funds
          </button>
          <button type="button" onClick={openWithdraw} className="btn-kite-blue">
            Withdraw
          </button>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-lg-7">
          <div
            className="p-4 rounded border"
            style={{
              background: "var(--card-bg, #fff)",
              borderColor: "var(--border-color, #e0e3eb)",
            }}
          >
            <h4 className="fs-5 fw-bold mb-4" style={{ color: "var(--text-primary)" }}>
              Equity
            </h4>

            <div className="summary-details">
              <div className="detail-row py-2 border-bottom">
                <span>Available margin</span>
                <span className="fs-5 text-primary">₹{formatCurrency(currentAvailable)}</span>
              </div>
              <div className="detail-row py-2 border-bottom">
                <span>Used margin</span>
                <span>₹{formatCurrency(fundsData.usedMargin)}</span>
              </div>
              <div className="detail-row py-2 border-bottom">
                <span>Available cash</span>
                <span className="fw-bold">₹{formatCurrency(currentAvailable)}</span>
              </div>
              <div className="detail-row py-2 border-bottom">
                <span>Opening balance</span>
                <span>₹{formatCurrency(currentAvailable + fundsData.usedMargin)}</span>
              </div>
              <div className="detail-row py-2 border-bottom">
                <span>Payin</span>
                <span>₹0.00</span>
              </div>
              <div className="detail-row py-2 border-bottom">
                <span>SPAN / Delivery margin</span>
                <span>₹0.00</span>
              </div>
              <div className="detail-row py-2">
                <span>Total Collateral</span>
                <span>₹0.00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div
            className="p-4 rounded border text-center h-100 d-flex flex-column justify-content-center"
            style={{
              background: "var(--card-bg, #fff)",
              borderColor: "var(--border-color, #e0e3eb)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🌾</div>
            <h5 className="fw-semibold">Commodity Trading</h5>
            <p className="text-muted small mb-4">
              You haven't activated your MCX commodity segment yet. Trade gold, silver, crude, and natural gas.
            </p>
            <button className="btn btn-outline-primary btn-sm align-self-center px-4">
              Activate Commodity Account
            </button>
          </div>
        </div>
      </div>

      {/* FUNDS MODAL */}
      {modalOpen && (
        <div className="kite-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="kite-order-window" onClick={(e) => e.stopPropagation()}>
            <div
              className={`kite-order-header ${modalType === "ADD" ? "buy" : "sell"}`}
              style={{ background: modalType === "ADD" ? "var(--accent-bull)" : "var(--accent-primary)" }}
            >
              <h3>{modalType === "ADD" ? "Add Funds via UPI" : "Withdraw Funds"}</h3>
              <button type="button" className="close-btn" onClick={() => setModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleFundAction}>
              <div className="kite-order-body">
                {message && <div className="alert alert-success py-2 px-3 small mb-3">{message}</div>}
                {error && <div className="alert alert-danger py-2 px-3 small mb-3">{error}</div>}

                <div className="kite-input-group mb-3">
                  <label>Amount (₹)</label>
                  <input
                    type="number"
                    step="100"
                    min="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    autoFocus
                    required
                  />
                </div>

                <div className="d-flex gap-2 mb-3">
                  {[5000, 10000, 25000, 50000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(String(preset))}
                      className="btn btn-sm btn-outline-secondary flex-grow-1"
                      style={{ fontSize: "0.75rem" }}
                    >
                      +₹{(preset / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>

                <p className="text-muted small mb-0">
                  {modalType === "ADD"
                    ? "Funds will be credited immediately to your Zerodha trading account."
                    : `Available to withdraw: ₹${formatCurrency(currentAvailable)}`}
                </p>
              </div>

              <div className="kite-order-footer">
                <div></div>
                <div className="action-btns">
                  <button
                    type="submit"
                    className={modalType === "ADD" ? "btn-kite-green" : "btn-kite-blue"}
                    disabled={processing}
                  >
                    {processing ? "Processing..." : modalType === "ADD" ? "Confirm & Deposit" : "Confirm Withdrawal"}
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setModalOpen(false)}
                    disabled={processing}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Funds;
