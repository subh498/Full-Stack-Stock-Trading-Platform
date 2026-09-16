import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();

  return (
    <div className="container py-5 my-4">
      <div className="row text-center justify-content-center">
        <h2 className="fs-1 fw-bold" style={{ color: "var(--text-primary)" }}>
          The Nexvoro Ecosystem
        </h2>
        <p className="text-muted small mb-5">
          Supercharge your capital allocation with specialized algorithmic and thematic trading integrations.
        </p>

        <div className="col-md-4 p-3">
          <img src="/media/images/smallcaseLogo.png" alt="smallcase" className="img-fluid mb-2" style={{ maxHeight: "45px" }} />
          <p className="text-muted small">Thematic Portfolio Baskets</p>
        </div>
        <div className="col-md-4 p-3">
          <img src="/media/images/streakLogo.png" alt="streak" className="img-fluid mb-2" style={{ maxHeight: "45px" }} />
          <p className="text-muted small">Quantitative Algo &amp; Strategy Engine</p>
        </div>
        <div className="col-md-4 p-3">
          <img src="/media/images/sensibullLogo.svg" alt="sensibull" className="img-fluid mb-2" style={{ maxHeight: "36px" }} />
          <p className="text-muted small">Advanced Options &amp; Greeks Visualizer</p>
        </div>
        <div className="col-md-4 p-3 mt-md-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
            <span style={{ fontSize: "1.8rem" }}>🏛️</span>
            <span className="fw-bold fs-5" style={{ color: "var(--text-primary)" }}>Nexvoro Capital</span>
          </div>
          <p className="text-muted small">Automated Index &amp; Asset Management</p>
        </div>
        <div className="col-md-4 p-3 mt-md-4">
          <img src="/media/images/goldenpiLogo.png" alt="goldenpi" className="img-fluid mb-2" style={{ maxHeight: "45px" }} />
          <p className="text-muted small">Fixed Income &amp; Corporate Bonds</p>
        </div>
        <div className="col-md-4 p-3 mt-md-4">
          <img src="/media/images/dittoLogo.png" alt="ditto" className="img-fluid mb-2" style={{ maxHeight: "40px" }} />
          <p className="text-muted small">Transparent Insurance Advisory</p>
        </div>

        <div className="col-12 mt-5">
          <button
            className="btn btn-primary px-4 py-2 fs-6 fw-semibold"
            style={{ minWidth: "200px", borderRadius: "6px" }}
            onClick={() => navigate("/signup")}
          >
            Create Your Account Now &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default Universe;
