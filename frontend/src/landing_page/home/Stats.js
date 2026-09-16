import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  return (
    <div className="container py-4">
      <div className="row align-items-center g-5 py-5">
        <div className="col-lg-6">
          <h2 className="fs-2 fw-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Engineered for Precision, Scale &amp; Speed
          </h2>

          <div className="mb-4">
            <h4 className="fs-5 fw-semibold" style={{ color: "var(--text-primary)" }}>
              Sub-Millisecond Order Routing
            </h4>
            <p className="text-muted small">
              Our proprietary matching gateway minimizes slippage and delivers lightning-fast execution across NSE, BSE, and MCX markets.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="fs-5 fw-semibold" style={{ color: "var(--text-primary)" }}>
              Institutional-Grade Risk Architecture
            </h4>
            <p className="text-muted small">
              Automated real-time margin computation, pre-trade risk checks, and dynamic portfolio stress-testing keep your capital secure.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="fs-5 fw-semibold" style={{ color: "var(--text-primary)" }}>
              The Nexvoro Ecosystem
            </h4>
            <p className="text-muted small">
              An integrated universe of quantitative analysis tools, open REST &amp; WebSocket APIs, and automated backtesting frameworks.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="fs-5 fw-semibold" style={{ color: "var(--text-primary)" }}>
              Zero Commission &amp; Transparent Margins
            </h4>
            <p className="text-muted small">
              ₹0 brokerage on equity delivery investments and flat ₹20 for high-frequency intraday and F&amp;O trades with no hidden markup.
            </p>
          </div>
        </div>

        <div className="col-lg-6 text-center">
          <img
            src="/media/images/ecosystem.png"
            alt="Nexvoro Ecosystem"
            className="img-fluid mb-4"
            style={{ maxWidth: "85%" }}
          />
          <div className="d-flex justify-content-center gap-4">
            <Link to="/product" className="fw-semibold text-decoration-none">
              Explore Products &rarr;
            </Link>
            <Link to="/dashboard" className="fw-semibold text-primary text-decoration-none">
              ⚡ Launch Nexvoro Terminal &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
