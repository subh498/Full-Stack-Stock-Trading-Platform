import React from "react";

function Awards() {
  return (
    <div className="container py-4 my-3">
      <div className="row align-items-center g-5">
        <div className="col-lg-6 text-center">
          <img
            src="/media/images/largestBroker.svg"
            alt="Nexvoro Market Leadership"
            className="img-fluid"
            style={{ maxHeight: "380px" }}
          />
        </div>
        <div className="col-lg-6">
          <h2 className="fs-2 fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Next-Gen Multi-Asset Powerhouse
          </h2>
          <p className="text-muted mb-4" style={{ fontSize: "1.05rem", lineHeight: "1.7" }}>
            Active retail and quantitative traders leverage Nexvoro's high-speed distributed execution gateway
            to trade and invest across all major exchange segments:
          </p>
          <div className="row mb-4">
            <div className="col-6">
              <ul className="list-unstyled text-muted d-flex flex-column gap-2 small">
                <li className="d-flex align-items-center gap-2">
                  <span className="text-primary fw-bold">✓</span> Equities &amp; IPO Allotments
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span className="text-primary fw-bold">✓</span> Futures &amp; Options (Index / Stock)
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span className="text-primary fw-bold">✓</span> Commodity &amp; Energy Derivatives
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul className="list-unstyled text-muted d-flex flex-column gap-2 small">
                <li className="d-flex align-items-center gap-2">
                  <span className="text-primary fw-bold">✓</span> Direct Mutual Funds &amp; ETFs
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span className="text-primary fw-bold">✓</span> Sovereign Gold &amp; Govt. Bonds
                </li>
                <li className="d-flex align-items-center gap-2">
                  <span className="text-primary fw-bold">✓</span> Currency &amp; Global Crosses
                </li>
              </ul>
            </div>
          </div>
          <img
            src="/media/images/pressLogos.png"
            alt="Recognized across financial press"
            className="img-fluid"
            style={{ width: "85%", opacity: 0.85 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Awards;
