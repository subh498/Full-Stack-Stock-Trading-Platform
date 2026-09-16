import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      {/* Top Badge & Hero Headline */}
      <div className="row text-center justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-center mb-3">
            <div className="badge-pill-glow">
              <span className="pulse-dot"></span>
              <span>Next-Gen Quant Engine • Ultra-Low Latency Routing</span>
            </div>
          </div>

          <h1
            className="fw-bold mb-3 display-4"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.15 }}
          >
            The Future of Algorithmic &amp; <br />
            <span className="hero-gradient-text">Multi-Asset Trading</span>
          </h1>

          <p
            className="lead text-muted mb-4 mx-auto"
            style={{ maxWidth: "720px", fontSize: "1.15rem", lineHeight: 1.65 }}
          >
            Execute equities, derivatives, index baskets, and automated strategies with
            sub-millisecond order routing, deterministic risk controls, and ₹0 commission
            on equity investments.
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
            <button
              className="btn-nexvoro-primary"
              onClick={() => navigate("/signup")}
            >
              <span>Get Started Free</span>
              <span>&rarr;</span>
            </button>
            <button
              className="btn-nexvoro-outline"
              onClick={() => navigate("/dashboard")}
            >
              <span>⚡ Launch Nexvoro Terminal</span>
            </button>
          </div>
        </div>
      </div>

      {/* High-Tech Terminal Preview Glass Card */}
      <div className="row justify-content-center mt-2">
        <div className="col-lg-11 col-xl-10">
          <div
            className="nexvoro-card p-3 p-md-4 shadow-lg"
            style={{
              background:
                "linear-gradient(180deg, var(--card-bg) 0%, rgba(15, 23, 42, 0.98) 100%)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              borderRadius: "16px",
            }}
          >
            {/* Terminal Window Header */}
            <div className="d-flex flex-wrap align-items-center justify-content-between pb-3 mb-3 border-bottom border-secondary border-opacity-25 gap-2">
              <div className="d-flex align-items-center gap-2">
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#ef4444" }}></span>
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#f59e0b" }}></span>
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", background: "#10b981" }}></span>
                <span className="font-mono text-muted small ms-2">
                  nexvoro-terminal://core-engine.v2.4
                </span>
              </div>
              <div className="d-flex align-items-center gap-3 small font-mono">
                <span className="text-success d-flex align-items-center gap-1">
                  <span className="pulse-dot"></span> LIVE TICK: 1.2ms
                </span>
                <span className="text-muted d-none d-sm-inline">NSE / BSE DIRECT</span>
              </div>
            </div>

            {/* Terminal Content Mockup */}
            <div className="row g-3">
              {/* Stat 1: Portfolio Value */}
              <div className="col-md-4">
                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "rgba(37, 99, 235, 0.08)",
                    border: "1px solid rgba(37, 99, 235, 0.2)",
                  }}
                >
                  <div className="d-flex justify-content-between text-muted small mb-1">
                    <span>TOTAL PORTFOLIO</span>
                    <span className="badge bg-primary bg-opacity-25 text-primary">REAL-TIME</span>
                  </div>
                  <div className="fs-4 fw-bold font-mono text-white">₹14,85,620.00</div>
                  <div className="small text-success font-mono mt-1">
                    ▲ +₹28,450.00 (+1.95%) TODAY
                  </div>
                </div>
              </div>

              {/* Stat 2: Active Strategies */}
              <div className="col-md-4">
                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "rgba(6, 182, 212, 0.08)",
                    border: "1px solid rgba(6, 182, 212, 0.2)",
                  }}
                >
                  <div className="d-flex justify-content-between text-muted small mb-1">
                    <span>EXECUTION ENGINE</span>
                    <span className="badge bg-info bg-opacity-25 text-info">ALGO READY</span>
                  </div>
                  <div className="fs-4 fw-bold font-mono text-white">3 Active Algos</div>
                  <div className="small text-info font-mono mt-1">
                    ⚡ Microsecond Smart Order Routing
                  </div>
                </div>
              </div>

              {/* Stat 3: Available Margin */}
              <div className="col-md-4">
                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "rgba(16, 185, 129, 0.08)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <div className="d-flex justify-content-between text-muted small mb-1">
                    <span>AVAILABLE MARGIN</span>
                    <span className="badge bg-success bg-opacity-25 text-success">INSTANT</span>
                  </div>
                  <div className="fs-4 fw-bold font-mono text-white">₹2,45,000.00</div>
                  <div className="small text-muted font-mono mt-1">
                    Zero Overnight Collateral Penalty
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Live Ticker Table Mockup */}
            <div
              className="mt-3 p-3 rounded-3"
              style={{
                background: "rgba(0, 0, 0, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div className="table-responsive">
                <table className="table table-sm table-borderless text-white mb-0 align-middle">
                  <thead>
                    <tr className="text-muted font-mono small border-bottom border-secondary border-opacity-25">
                      <th>INSTRUMENT</th>
                      <th>LAST PRICE</th>
                      <th>CHANGE</th>
                      <th>DAY RANGE</th>
                      <th className="text-end">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono small">
                    <tr>
                      <td className="fw-bold text-white">NIFTY 50</td>
                      <td>24,842.10</td>
                      <td className="text-success">▲ +138.40 (+0.56%)</td>
                      <td>
                        <div
                          className="progress"
                          style={{ height: "4px", width: "120px", background: "rgba(255,255,255,0.1)" }}
                        >
                          <div
                            className="progress-bar bg-success"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                      </td>
                      <td className="text-end">
                        <span className="badge bg-primary px-2 py-1">TRADE</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-white">HDFCBANK</td>
                      <td>1,648.20</td>
                      <td className="text-success">▲ +18.40 (+1.13%)</td>
                      <td>
                        <div
                          className="progress"
                          style={{ height: "4px", width: "120px", background: "rgba(255,255,255,0.1)" }}
                        >
                          <div
                            className="progress-bar bg-success"
                            style={{ width: "82%" }}
                          ></div>
                        </div>
                      </td>
                      <td className="text-end">
                        <span className="badge bg-primary px-2 py-1">TRADE</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="fw-bold text-white">RELIANCE</td>
                      <td>2,982.50</td>
                      <td className="text-success">▲ +32.10 (+1.09%)</td>
                      <td>
                        <div
                          className="progress"
                          style={{ height: "4px", width: "120px", background: "rgba(255,255,255,0.1)" }}
                        >
                          <div
                            className="progress-bar bg-success"
                            style={{ width: "68%" }}
                          ></div>
                        </div>
                      </td>
                      <td className="text-end">
                        <span className="badge bg-primary px-2 py-1">TRADE</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
