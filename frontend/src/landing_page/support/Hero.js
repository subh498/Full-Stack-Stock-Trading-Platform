import React from "react";

function Hero() {
  return (
    <section className="container-fluid py-5" id="supportHero" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)", color: "#fff" }}>
      <div className="container" id="supportWrapper">
        <h4 className="fw-bold m-0">Nexvoro Support Portal</h4>
        <a href="#track-tickets" className="text-white text-decoration-none small fw-semibold">
          Track Active Tickets &rarr;
        </a>
      </div>

      <div className="container py-4">
        <div className="row g-4 align-items-center">
          <div className="col-lg-7">
            <h1 className="fs-3 fw-bold mb-3">
              Search for answers, market guides, or developer documentation
            </h1>
            <div className="position-relative mb-3">
              <input
                type="text"
                className="form-control py-3 px-4 shadow-sm"
                placeholder="Eg. how do I execute bracket orders, generate API keys, or deposit funds..."
                style={{ borderRadius: "8px", border: "none" }}
              />
            </div>
            <div className="d-flex flex-wrap gap-3 small">
              <a href="#account" className="text-white text-decoration-underline opacity-75">Account Verification</a>
              <a href="#margins" className="text-white text-decoration-underline opacity-75">Intraday Margins</a>
              <a href="#api" className="text-white text-decoration-underline opacity-75">Quant API Docs</a>
              <a href="#manual" className="text-white text-decoration-underline opacity-75">Nexvoro User Guide</a>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="p-4 rounded" style={{ background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(4px)" }}>
              <h5 className="fw-bold mb-3">Market Bulletins &amp; Circulars</h5>
              <ol className="mb-0 small d-flex flex-column gap-2 ps-3">
                <li>
                  <a href="#bulletin-1" className="text-white text-decoration-none opacity-90">
                    NSE &amp; BSE New T+1 Rolling Settlement Guidelines
                  </a>
                </li>
                <li>
                  <a href="#bulletin-2" className="text-white text-decoration-none opacity-90">
                    Latest Intraday Leverage Rules (MIS / CO Segment)
                  </a>
                </li>
                <li>
                  <a href="#bulletin-3" className="text-white text-decoration-none opacity-90">
                    Scheduled Exchange Mock Trading Session This Saturday
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
