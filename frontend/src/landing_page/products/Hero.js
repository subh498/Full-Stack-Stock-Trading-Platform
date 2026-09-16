import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="badge-pill-glow mb-3">
            <span className="pulse-dot"></span>
            <span>THE NEXVORO ECOSYSTEM • MULTI-PLATFORM SUITE</span>
          </div>
          <h1 className="fw-bold mb-3 display-5" style={{ color: "var(--text-primary)" }}>
            Quantitative Infrastructure &amp;{" "}
            <span className="hero-gradient-text">Algorithmic Tooling</span>
          </h1>
          <p className="lead text-muted mx-auto mb-4" style={{ maxWidth: "680px", fontSize: "1.12rem" }}>
            From high-speed web terminals to low-latency developer APIs and thematic asset management,
            experience deterministic execution across all market cycles.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/dashboard" className="btn-nexvoro-primary btn-sm px-4 py-2 text-decoration-none">
              ⚡ Launch Live Web Terminal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
