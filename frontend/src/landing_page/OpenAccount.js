import React from "react";
import { useNavigate } from "react-router-dom";

function OpenAccount() {
  const navigate = useNavigate();

  return (
    <div className="container py-5 my-3">
      <div className="row text-center justify-content-center">
        <div className="col-lg-8">
          <h2 className="fs-1 fw-bold mt-4 mb-3" style={{ color: "var(--text-primary)" }}>
            Open a Nexvoro Account
          </h2>
          <p className="text-muted fs-5 mb-4">
            Modern trading infrastructure, ₹0 equity investment brokerage, and flat ₹20 for intraday and F&amp;O trades.
          </p>
          <button
            className="btn btn-primary px-4 py-2 fs-6 fw-semibold mb-4"
            style={{ minWidth: "200px", borderRadius: "6px" }}
            onClick={() => navigate("/signup")}
          >
            Start Trading with Nexvoro &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
