import React from "react";
import { Link } from "react-router-dom";

function Education() {
  return (
    <div className="container py-5 my-4">
      <div className="row align-items-center g-5">
        <div className="col-lg-6 text-center">
          <img
            src="/media/images/education.svg"
            alt="Nexvoro Market Academy"
            className="img-fluid"
            style={{ width: "75%" }}
          />
        </div>
        <div className="col-lg-6">
          <h2 className="mb-3 fs-2 fw-bold" style={{ color: "var(--text-primary)" }}>
            Free &amp; Open Financial Intelligence
          </h2>
          <p className="text-muted mb-3" style={{ lineHeight: "1.7" }}>
            <strong>Nexvoro Academy</strong>: An extensive curriculum covering everything from macroeconomic
            fundamentals, technical indicators, and options pricing models to quantitative backtesting.
          </p>
          <Link
            to="/about"
            className="fw-semibold text-primary text-decoration-none d-inline-flex align-items-center gap-1 mb-4"
          >
            <span>Explore Nexvoro Academy</span> &rarr;
          </Link>

          <p className="text-muted mb-3" style={{ lineHeight: "1.7" }}>
            <strong>Nexvoro Quant Hub</strong>: An active developer and quantitative trader forum to share algorithmic strategies, code snippets, and market insights.
          </p>
          <Link
            to="/support"
            className="fw-semibold text-primary text-decoration-none d-inline-flex align-items-center gap-1"
          >
            <span>Visit Community &amp; Research Forum</span> &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Education;
