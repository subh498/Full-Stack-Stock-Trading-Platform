import React from "react";
import { Link } from "react-router-dom";

function Education() {
  return (
    <div className="container py-5 my-3">
      <div className="row align-items-center g-5">
        <div className="col-lg-6 text-center">
          <div className="nexvoro-card p-4 p-md-5">
            <img
              src="/media/images/education.svg"
              alt="Nexvoro Market Academy"
              className="img-fluid"
              style={{ maxHeight: "300px", filter: "drop-shadow(0 8px 24px rgba(37, 99, 235, 0.15))" }}
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="badge-pill-glow mb-2">
            <span className="pulse-dot"></span>
            <span>FINANCIAL INTELLIGENCE &amp; RESEARCH</span>
          </div>

          <h2 className="display-6 fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Free &amp; Open <span className="hero-gradient-text">Financial Intelligence</span>
          </h2>

          <div className="d-flex flex-column gap-3 mb-4">
            <div className="nexvoro-card p-3">
              <h5 className="fw-bold mb-1 text-primary">🎓 Nexvoro Academy</h5>
              <p className="text-muted small mb-2" style={{ lineHeight: 1.6 }}>
                An extensive, self-paced curriculum covering everything from foundational capital
                markets, technical analysis, and options pricing to quantitative Python backtesting.
              </p>
              <Link to="/about" className="fw-semibold text-primary text-decoration-none small">
                Explore Curriculum &rarr;
              </Link>
            </div>

            <div className="nexvoro-card p-3">
              <h5 className="fw-bold mb-1 text-info">🔬 Nexvoro Quant Hub</h5>
              <p className="text-muted small mb-2" style={{ lineHeight: 1.6 }}>
                An open developer and algorithmic trading forum to share custom execution bots,
                quantitative formulas, backtesting datasets, and market insights.
              </p>
              <Link to="/support" className="fw-semibold text-info text-decoration-none small">
                Visit Research Community &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
