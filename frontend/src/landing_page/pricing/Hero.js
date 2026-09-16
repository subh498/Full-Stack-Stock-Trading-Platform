import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="badge-pill-glow mb-2">
          <span className="pulse-dot"></span>
          <span>TRANSPARENT VALUE • ZERO HIDDEN COMMISSIONS</span>
        </div>
        <h1 className="fw-bold display-5 mb-2" style={{ color: "var(--text-primary)" }}>
          Predictable, <span className="hero-gradient-text">Fair &amp; Transparent</span> Pricing
        </h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "600px", fontSize: "1.1rem" }}>
          Zero commission on long-term equity wealth building. Flat ₹20 for high-velocity algorithmic and intraday trades.
        </p>
      </div>

      {/* 3 Pricing Cards */}
      <div className="row g-4 justify-content-center">
        {/* Card 1 */}
        <div className="col-lg-4 col-md-6">
          <div className="nexvoro-card p-4 text-center h-100 d-flex flex-column justify-content-between">
            <div>
              <img
                src="/media/images/pricingEquity.svg"
                alt="Free equity delivery"
                style={{ height: "130px", marginBottom: "20px" }}
              />
              <div className="fs-1 fw-bold font-mono text-primary mb-1">₹0</div>
              <h4 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>
                Free Equity Delivery
              </h4>
              <p className="text-muted small" style={{ lineHeight: 1.6 }}>
                All equity delivery investments across NSE and BSE are completely free. ₹0 brokerage forever.
              </p>
            </div>
            <div className="pt-3 border-top border-secondary border-opacity-10 mt-3">
              <span className="badge bg-primary bg-opacity-10 text-primary small">
                Long-Term Wealth Building
              </span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-lg-4 col-md-6">
          <div
            className="nexvoro-card p-4 text-center h-100 d-flex flex-column justify-content-between"
            style={{ border: "2px solid rgba(37, 99, 235, 0.35)" }}
          >
            <div>
              <div className="badge bg-primary px-3 py-1 mb-2 font-mono small">
                MOST POPULAR
              </div>
              <div>
                <img
                  src="/media/images/intradayTrades.svg"
                  alt="Intraday and F&O trades"
                  style={{ height: "115px", marginBottom: "20px" }}
                />
              </div>
              <div className="fs-1 fw-bold font-mono text-info mb-1">₹20</div>
              <h4 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>
                Intraday &amp; F&amp;O Trades
              </h4>
              <p className="text-muted small" style={{ lineHeight: 1.6 }}>
                Flat ₹20 or 0.03% (whichever is lower) per executed order across Equity Intraday, Futures, and Options.
              </p>
            </div>
            <div className="pt-3 border-top border-secondary border-opacity-10 mt-3">
              <span className="badge bg-info bg-opacity-10 text-info small">
                High-Frequency &amp; Quant Ready
              </span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-lg-4 col-md-6">
          <div className="nexvoro-card p-4 text-center h-100 d-flex flex-column justify-content-between">
            <div>
              <img
                src="/media/images/pricingEquity.svg"
                alt="Free direct mutual funds"
                style={{ height: "130px", marginBottom: "20px" }}
              />
              <div className="fs-1 fw-bold font-mono text-success mb-1">₹0</div>
              <h4 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>
                Direct Mutual Funds
              </h4>
              <p className="text-muted small" style={{ lineHeight: 1.6 }}>
                Zero distributor commissions and ₹0 DP charges on all direct mutual funds delivered right to demat.
              </p>
            </div>
            <div className="pt-3 border-top border-secondary border-opacity-10 mt-3">
              <span className="badge bg-success bg-opacity-10 text-success small">
                100% Direct Plans
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <Link to="/signup" className="btn-nexvoro-primary px-4 py-2">
          Open Free Trading Account &rarr;
        </Link>
      </div>
    </div>
  );
}

export default Hero;
