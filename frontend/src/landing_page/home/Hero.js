import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="container py-5 my-3">
      <div className="row text-center justify-content-center">
        <div className="col-lg-10">
          <img
            src="/media/images/homeHero.png"
            alt="Nexvoro Platform Preview"
            className="img-fluid mb-4"
            style={{ maxHeight: "420px", objectFit: "contain" }}
          />
          <h1 className="fw-bold mt-4 mb-3 fs-1" style={{ color: "var(--text-primary)" }}>
            The Future of Algorithmic &amp; Multi-Asset Trading
          </h1>
          <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: "680px", fontSize: "1.15rem" }}>
            Execute equities, derivatives, commodities, and index baskets with institutional sub-millisecond
            routing, real-time risk simulation, and zero commission on equity investments.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
            <button
              className="btn btn-primary px-4 py-2 fs-6 fw-semibold"
              style={{ minWidth: "190px", borderRadius: "6px" }}
              onClick={() => navigate("/signup")}
            >
              Get Started Free &rarr;
            </button>
            <button
              className="btn btn-outline-primary px-4 py-2 fs-6 fw-semibold"
              style={{ minWidth: "190px", borderRadius: "6px" }}
              onClick={() => navigate("/dashboard")}
            >
              ⚡ Launch Nexvoro Terminal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
