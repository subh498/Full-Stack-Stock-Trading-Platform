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
      .get(`${API_BASE_URL}/allOrders`)
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
      await axios.delete(`${API_BASE_URL}/order/${orderId}`);
      setAllOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert("Failed to cancel order. Please try again.");
    }
  };

  return (
    <div className="orders">
      {loading ? (
        <div style={{ padding: "30px 10px", color: "#666" }}>
          <p>Loading orders from database...</p>
        </div>
      ) : allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <h3 className="title">Orders ({allOrders.length})</h3>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Mode</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.map((order, index) => (
                  <tr key={order._id || index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{Number(order.price).toFixed(2)}</td>
                    <td className={order.mode === "BUY" ? "profit" : "loss"}>
                      {order.mode}
                    </td>
                    <td>
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        style={{
                          background: "transparent",
                          border: "1px solid #ddd",
                          borderRadius: "3px",
                          color: "#888",
                          cursor: "pointer",
                          padding: "3px 8px",
                          fontSize: "0.75rem",
                        }}
                        title="Cancel this order"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
