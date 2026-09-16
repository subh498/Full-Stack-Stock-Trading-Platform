import React from "react";
import { Link } from "react-router-dom";

function Team() {
  return (
    <div className="container py-5">
      {/* Section Header */}
      <div className="text-center mb-4">
        <div className="badge-pill-glow mb-2">
          <span className="pulse-dot"></span>
          <span>SYSTEMS ARCHITECTURE &amp; QUANTITATIVE RESEARCH</span>
        </div>
        <h2 className="fw-bold fs-2" style={{ color: "var(--text-primary)" }}>
          Engineering the Next Generation of Capital Markets
        </h2>
        <p className="text-muted small mx-auto" style={{ maxWidth: "600px" }}>
          Built by quantitative developers, algorithmic researchers, and distributed cloud engineers.
        </p>
      </div>

      {/* Main Engineering Card */}
      <div className="nexvoro-card p-4 p-md-5 mt-4">
        <div className="row align-items-center g-4">
          {/* Left Column: Tech Emblem & Group Bio */}
          <div className="col-lg-5 text-center">
            <div
              style={{
                width: "240px",
                height: "240px",
                margin: "0 auto",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%)",
                border: "2px solid rgba(56, 189, 248, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                boxShadow: "0 0 45px rgba(37, 99, 235, 0.35)",
              }}
            >
              <img
                src="/media/images/nexvoro-emblem.svg"
                alt="Nexvoro Quantitative Architecture"
                style={{ width: "95%", height: "95%", filter: "drop-shadow(0 4px 12px rgba(6, 182, 212, 0.4))" }}
              />
            </div>

            <h4 className="mt-4 mb-1 fw-bold" style={{ color: "var(--text-primary)" }}>
              Nexvoro Research Group
            </h4>
            <div className="text-primary fw-semibold small mb-3">
              Quantitative Systems &amp; Market Engineering
            </div>

            {/* Tech Badges */}
            <div className="d-flex flex-wrap justify-content-center gap-2">
              <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-2 py-1 small font-mono">
                ⚡ C++ Low-Latency
              </span>
              <span className="badge bg-info bg-opacity-10 text-info border border-info border-opacity-25 px-2 py-1 small font-mono">
                📊 Monte-Carlo Risk
              </span>
              <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2 py-1 small font-mono">
                🛡️ Distributed Ledger
              </span>
            </div>
          </div>

          {/* Right Column: Architectural Highlights */}
          <div className="col-lg-7">
            <h5 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
              Deterministic Execution. Total Integrity.
            </h5>
            <p className="text-secondary" style={{ lineHeight: 1.8 }}>
              Nexvoro was engineered from the ground up to eradicate latency bottlenecks, opaque
              spreads, and outdated trading UX. Every component in the Nexvoro engine is benchmarked
              for microsecond routing, atomic balance deduplication, and zero slippage.
            </p>

            <div className="row g-3 my-2">
              <div className="col-sm-6">
                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "rgba(37, 99, 235, 0.06)",
                    border: "1px solid rgba(37, 99, 235, 0.15)",
                  }}
                >
                  <div className="fw-bold text-primary small mb-1">
                    ⚡ Sub-Millisecond Gateway
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    Direct memory access order pipelines bypassing intermediary routing layers.
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div
                  className="p-3 rounded-3"
                  style={{
                    background: "rgba(16, 185, 129, 0.06)",
                    border: "1px solid rgba(16, 185, 129, 0.15)",
                  }}
                >
                  <div className="fw-bold text-success small mb-1">
                    🛡️ Real-Time Margin Ledger
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    Dynamic intra-day position checking preventing forced liquidation events.
                  </div>
                </div>
              </div>
            </div>

            <p className="text-secondary mt-3" style={{ lineHeight: 1.8 }}>
              Algorithmic transparency, zero hidden charges, and relentless software craftsmanship
              remain the core DNA of Nexvoro.
            </p>

            {/* Quick Action Links */}
            <div className="pt-2 d-flex flex-wrap gap-3 align-items-center">
              <Link to="/product" className="btn-nexvoro-primary btn-sm px-3 py-2 text-decoration-none">
                Explore Technology &rarr;
              </Link>
              <Link to="/dashboard" className="btn-nexvoro-outline btn-sm px-3 py-2 text-decoration-none">
                ⚡ Launch Terminal
              </Link>
              <Link to="/support" className="text-muted text-decoration-none small ms-2">
                Developer Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
