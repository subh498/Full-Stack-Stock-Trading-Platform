import React from "react";
import { useNavigate } from "react-router-dom";

function OpenAccount() {
  const navigate = useNavigate();

  return (
    <div className="container py-5 my-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div
            className="nexvoro-card p-5 text-center shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, var(--card-bg) 0%, rgba(37, 99, 235, 0.08) 100%)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
            }}
          >
            <div className="badge-pill-glow mb-3">
              <span className="pulse-dot"></span>
              <span>INSTANT DIGITAL ONBOARDING</span>
            </div>
            <h2 className="display-6 fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Open Your <span className="hero-gradient-text">Nexvoro Trading Account</span>
            </h2>
            <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: "620px", fontSize: "1.1rem" }}>
              Experience next-gen execution, ₹0 equity delivery brokerage, and sub-millisecond
              order routing in under 2 minutes.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <button
                className="btn-nexvoro-primary px-4 py-2"
                onClick={() => navigate("/signup")}
              >
                <span>Start Trading Free</span>
                <span>&rarr;</span>
              </button>
              <button
                className="btn-nexvoro-outline px-4 py-2"
                onClick={() => navigate("/dashboard")}
              >
                <span>⚡ Test Demo Terminal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
