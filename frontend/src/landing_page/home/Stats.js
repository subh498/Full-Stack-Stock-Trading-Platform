import React from "react";
import { Link } from "react-router-dom";

function Stats() {
  const features = [
    {
      icon: "⚡",
      title: "Sub-Millisecond Order Routing",
      desc: "Our proprietary matching gateway minimizes slippage and delivers lightning-fast execution across NSE, BSE, and MCX markets.",
      color: "primary",
    },
    {
      icon: "🛡️",
      title: "Institutional-Grade Risk Architecture",
      desc: "Automated real-time margin computation, pre-trade risk checks, and dynamic portfolio stress-testing keep your capital secure.",
      color: "info",
    },
    {
      icon: "🌐",
      title: "The Nexvoro Ecosystem",
      desc: "An integrated universe of quantitative analysis tools, open REST & WebSocket APIs, and automated backtesting frameworks.",
      color: "success",
    },
    {
      icon: "💎",
      title: "Zero Commission & Transparent Margins",
      desc: "₹0 brokerage on equity delivery investments and flat ₹20 for high-frequency intraday and F&O trades with no hidden markup.",
      color: "warning",
    },
  ];

  return (
    <div className="container py-5">
      <div className="row align-items-center g-5">
        {/* Left Column: Feature Grid */}
        <div className="col-lg-6">
          <div className="badge-pill-glow mb-2">
            <span className="pulse-dot"></span>
            <span>PRECISION ENGINEERING</span>
          </div>
          <h2 className="display-6 fw-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Engineered for <span className="hero-gradient-text">Precision, Scale &amp; Speed</span>
          </h2>

          <div className="row g-3">
            {features.map((feat, idx) => (
              <div key={idx} className="col-12">
                <div className="nexvoro-card p-3 p-md-4 d-flex gap-3 align-items-start">
                  <div
                    className="p-2 rounded-3 fs-4"
                    style={{
                      background: "rgba(37, 99, 235, 0.08)",
                      border: "1px solid rgba(37, 99, 235, 0.2)",
                      lineHeight: 1,
                    }}
                  >
                    {feat.icon}
                  </div>
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: "var(--text-primary)", fontSize: "1.05rem" }}>
                      {feat.title}
                    </h5>
                    <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Ecosystem Card */}
        <div className="col-lg-6 text-center">
          <div className="nexvoro-card p-4 p-md-5 shadow-lg">
            <img
              src="/media/images/ecosystem.png"
              alt="Nexvoro Ecosystem"
              className="img-fluid mb-4"
              style={{ maxHeight: "360px", objectFit: "contain", filter: "drop-shadow(0 8px 24px rgba(37, 99, 235, 0.15))" }}
            />
            <h4 className="fw-bold mb-2" style={{ color: "var(--text-primary)" }}>
              The Nexvoro Unified Universe
            </h4>
            <p className="text-muted small mb-4 mx-auto" style={{ maxWidth: "420px" }}>
              Explore an end-to-end quant ecosystem connecting web terminals, mobile apps,
              and programmatic APIs.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/product" className="btn-nexvoro-outline btn-sm px-3 py-2 text-decoration-none">
                Explore Products &rarr;
              </Link>
              <Link to="/dashboard" className="btn-nexvoro-primary btn-sm px-3 py-2 text-decoration-none">
                ⚡ Launch Terminal &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
