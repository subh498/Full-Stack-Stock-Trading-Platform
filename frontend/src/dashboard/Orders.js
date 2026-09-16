import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/api/orders`)
      .then((res) => {
        setAllOrders(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!orderId) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/orders/${orderId}`);
      setAllOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert("Failed to cancel order. Please try again.");
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="title mb-0">Orders ({allOrders.length})</h3>
        <button
          onClick={fetchOrders}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
          style={{ fontSize: "0.8rem" }}
        >
          <span>🔄</span> Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ padding: "40px 10px", textAlign: "center", color: "var(--text-muted)" }}>
          <p>Loading order book from database...</p>
        </div>
      ) : allOrders.length === 0 ? (
        <div
          className="p-5 text-center bg-white rounded border"
          style={{ background: "var(--card-bg, #fff)", borderColor: "var(--border-color, #eee)" }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📋</div>
          <h5>No orders placed today</h5>
          <p className="text-muted small mb-3">
            Search for stocks on your Watchlist and click Buy or Sell to execute real trades.
          </p>
          <Link to="/dashboard" className="btn btn-primary btn-sm px-3">
            Go to Watchlist
          </Link>
        </div>
      ) : (
        <div className="order-table-container">
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Type</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order, index) => {
                  const isBuy = String(order.mode).toUpperCase() === "BUY";
                  const timeStr = order.createdAt
                    ? new Date(order.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Today";

                  return (
                    <tr key={order._id || index}>
                      <td>
                        <strong>{order.name}</strong>
                      </td>
                      <td>
                        <span
                          className={`badge ${isBuy ? "bg-primary" : "bg-danger"}`}
                          style={{ fontSize: "0.75rem", padding: "4px 8px" }}
                        >
                          {order.mode}
                        </span>
                      </td>
                      <td>{order.qty}</td>
                      <td>₹{Number(order.price).toFixed(2)}</td>
                      <td>
                        <span className="text-success fw-semibold" style={{ fontSize: "0.8rem" }}>
                          ● EXECUTED
                        </span>
                      </td>
                      <td style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{timeStr}</td>
                      <td>
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="btn btn-sm btn-outline-danger py-0 px-2"
                          style={{ fontSize: "0.75rem" }}
                          title="Remove from history"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
