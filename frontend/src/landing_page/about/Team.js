import React from "react";
import { Link } from "react-router-dom";

function Team() {
  return (
    <div className="container py-5">
      <div className="row p-3 mt-4 border-top" style={{ borderColor: "var(--border-color, #eee)" }}>
        <h2 className="text-center fw-bold fs-2" style={{ color: "var(--text-primary, #222)" }}>
          Leadership &amp; Architecture
        </h2>
        <p className="text-center text-muted small mt-1">
          Built by quant researchers, algorithmic specialists, and distributed systems architects.
        </p>
      </div>

      <div
        className="row p-4 align-items-center mt-3"
        style={{
          lineHeight: "1.8",
          fontSize: "1.05rem",
          background: "var(--card-bg, #ffffff)",
          border: "1px solid var(--border-color, #e0e3eb)",
          borderRadius: "12px",
          boxShadow: "var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05))",
        }}
      >
        <div className="col-lg-5 p-4 text-center">
          <div
            style={{
              width: "220px",
              height: "220px",
              margin: "0 auto",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(15,23,42,0.6) 100%)",
              border: "2px solid #0284c7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "15px",
              boxShadow: "0 8px 32px rgba(2, 132, 199, 0.2)",
            }}
          >
            <img
              src="/media/images/nexvoro-emblem.svg"
              alt="Nexvoro Quantitative Architecture"
              style={{ width: "90%", height: "90%" }}
            />
          </div>
          <h4 className="mt-4 mb-1 fw-bold" style={{ color: "var(--text-primary, #222)" }}>
            Nexvoro Research Group
          </h4>
          <h6 className="text-primary fw-semibold small">
            Quantitative Systems &amp; Market Engineering
          </h6>
        </div>

        <div className="col-lg-7 p-4 text-muted">
          <p>
            Nexvoro was founded to eliminate the high latency, clunky interfaces, and opaque fee structures
            of legacy stockbroking platforms. Built from the ground up by quantitative traders and distributed
            systems architects, Nexvoro delivers an autonomous, high-precision execution environment for modern retail
            and algorithmic market participants.
          </p>
          <p>
            Our infrastructure executes multi-asset trades with deterministic sub-millisecond precision, real-time
            margin calculations, and deep market depth visualization across equities, indices, and derivatives.
          </p>
          <p>
            Algorithmic transparency, zero hidden commissions, and relentless engineering are the core pillars
            of the Nexvoro philosophy.
          </p>
          <div className="pt-2 d-flex flex-wrap gap-3">
            <Link to="/product" className="fw-semibold text-decoration-none">
              Explore Nexvoro Tech &rarr;
            </Link>
            <span className="text-muted">•</span>
            <Link to="/dashboard" className="fw-semibold text-primary text-decoration-none">
              Launch Live Terminal &rarr;
            </Link>
            <span className="text-muted">•</span>
            <Link to="/support" className="fw-semibold text-decoration-none">
              Developer Support &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
