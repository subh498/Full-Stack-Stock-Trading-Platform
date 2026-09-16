import React from "react";

function Hero() {
  return (
    <div className="container py-4">
      {/* Top Header */}
      <div className="row text-center justify-content-center py-4">
        <div className="col-lg-10">
          <div className="badge-pill-glow mb-3">
            <span className="pulse-dot"></span>
            <span>ENGINEERED FOR MODERN ALPHA • SYSTEMIC RELIABILITY</span>
          </div>
          <h1 className="fw-bold mb-3 display-5" style={{ letterSpacing: "-0.03em" }}>
            Democratizing <span className="hero-gradient-text">Institutional-Grade Infrastructure</span>
            <br />
            For Algorithmic &amp; Retail Traders
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "720px", fontSize: "1.15rem" }}>
            Nexvoro replaces outdated legacy brokerage bottlenecks with a distributed,
            sub-millisecond execution engine designed for precision, transparency, and speed.
          </p>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="row g-4 my-3">
        <div className="col-md-3 col-6">
          <div className="nexvoro-card p-4 text-center h-100">
            <div className="fs-2 fw-bold font-mono text-primary mb-1">&lt; 1.2ms</div>
            <div className="fw-semibold text-secondary small">Order Execution Speed</div>
            <div className="text-muted mt-1" style={{ fontSize: "0.78rem" }}>
              Microsecond smart order routing
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="nexvoro-card p-4 text-center h-100">
            <div className="fs-2 fw-bold font-mono text-info mb-1">99.99%</div>
            <div className="fw-semibold text-secondary small">Platform Uptime SLA</div>
            <div className="text-muted mt-1" style={{ fontSize: "0.78rem" }}>
              Fault-tolerant cloud architecture
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="nexvoro-card p-4 text-center h-100">
            <div className="fs-2 fw-bold font-mono text-success mb-1">₹0</div>
            <div className="fw-semibold text-secondary small">Equity Delivery Brokerage</div>
            <div className="text-muted mt-1" style={{ fontSize: "0.78rem" }}>
              Completely transparent fee model
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div className="nexvoro-card p-4 text-center h-100">
            <div className="fs-2 fw-bold font-mono text-warning mb-1">10M+</div>
            <div className="fw-semibold text-secondary small">Daily Market Ticks</div>
            <div className="text-muted mt-1" style={{ fontSize: "0.78rem" }}>
              High-throughput streaming sockets
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Detailed Mission Section */}
      <div className="row g-4 mt-3">
        <div className="col-lg-6">
          <div className="nexvoro-card p-4 p-md-5 h-100">
            <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <span className="text-primary">⚡</span> The Architectural Shift
            </h4>
            <p className="text-secondary" style={{ lineHeight: 1.8 }}>
              Nexvoro was conceived to bridge the technological divide between top-tier
              quantitative hedge funds and retail investors. While legacy brokers rely on
              cumbersome, monolithic servers, we built an ultra-low latency, distributed cloud
              execution engine.
            </p>
            <p className="text-secondary" style={{ lineHeight: 1.8 }}>
              Today, Nexvoro delivers real-time market quotes, instant order matching, automated
              risk controls, and comprehensive portfolio analytics with zero hidden markups.
            </p>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="nexvoro-card p-4 p-md-5 h-100">
            <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <span className="text-info">🛡️</span> Algorithmic Transparency
            </h4>
            <p className="text-secondary" style={{ lineHeight: 1.8 }}>
              We believe intelligent investing requires modern tooling. Our platform integrates
              real-time margin validation, live P&amp;L accounting, and interactive visual charts
              to make market engagement seamless.
            </p>
            <p className="text-secondary" style={{ lineHeight: 1.8 }}>
              Through our open developer sandbox and SDKs, traders can backtest strategies,
              connect custom execution algorithms, and harness high-speed market data pipes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
