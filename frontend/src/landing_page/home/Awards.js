import React from "react";

function Awards() {
  const assetsLeft = [
    { title: "Equities & Pre-IPO", badge: "NSE/BSE" },
    { title: "Index & Stock Futures", badge: "F&O" },
    { title: "Commodity & Energy", badge: "MCX" },
  ];

  const assetsRight = [
    { title: "Direct Mutual Funds & ETFs", badge: "0% Commission" },
    { title: "Sovereign Gold & G-Secs", badge: "RBI" },
    { title: "Currency Derivatives", badge: "Forex" },
  ];

  return (
    <div className="container py-5 my-2">
      <div className="row align-items-center g-5">
        <div className="col-lg-6 text-center">
          <div className="nexvoro-card p-4 p-md-5">
            <img
              src="/media/images/largestBroker.svg"
              alt="Nexvoro Market Leadership"
              className="img-fluid"
              style={{ maxHeight: "320px", filter: "drop-shadow(0 8px 24px rgba(37, 99, 235, 0.15))" }}
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="badge-pill-glow mb-2">
            <span className="pulse-dot"></span>
            <span>MULTI-ASSET UNIVERSE</span>
          </div>

          <h2 className="display-6 fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Next-Gen <span className="hero-gradient-text">Multi-Asset Powerhouse</span>
          </h2>

          <p className="text-muted mb-4" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
            Active retail traders and institutional desks leverage Nexvoro's low-latency
            order gateway to execute seamlessly across all exchange segments:
          </p>

          <div className="row g-3 mb-4">
            <div className="col-sm-6">
              <div className="d-flex flex-column gap-2">
                {assetsLeft.map((item, i) => (
                  <div
                    key={i}
                    className="p-2 px-3 rounded-3 d-flex align-items-center justify-content-between"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <span className="small fw-semibold" style={{ color: "var(--text-primary)" }}>
                      ✓ {item.title}
                    </span>
                    <span className="badge bg-primary bg-opacity-10 text-primary font-mono" style={{ fontSize: "0.72rem" }}>
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="d-flex flex-column gap-2">
                {assetsRight.map((item, i) => (
                  <div
                    key={i}
                    className="p-2 px-3 rounded-3 d-flex align-items-center justify-content-between"
                    style={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <span className="small fw-semibold" style={{ color: "var(--text-primary)" }}>
                      ✓ {item.title}
                    </span>
                    <span className="badge bg-success bg-opacity-10 text-success font-mono" style={{ fontSize: "0.72rem" }}>
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="small text-muted mb-2 font-mono">RECOGNIZED &amp; TRUSTED PLATFORM</div>
            <img
              src="/media/images/pressLogos.png"
              alt="Recognized across financial press"
              className="img-fluid"
              style={{ maxHeight: "32px", opacity: 0.75 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
