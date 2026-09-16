import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          gap: "16px",
        }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading Kite...</span>
        </div>
        <p style={{ color: "var(--text-secondary, #666)", fontSize: "0.95rem" }}>
          Connecting to Zerodha Kite Terminal...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
          message: "Please sign in with your Zerodha Kite credentials to access the trading terminal.",
        }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
