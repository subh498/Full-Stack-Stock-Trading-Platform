import React from "react";

const appsList = [
  {
    name: "Coin",
    desc: "Direct mutual funds with zero brokerage and zero commission.",
    icon: "🪙",
    tag: "Mutual Funds",
  },
  {
    name: "Streak",
    desc: "Systematic trading platform without coding. Create algorithms easily.",
    icon: "⚡",
    tag: "Algo Trading",
  },
  {
    name: "Sensibull",
    desc: "Options trading platform with strategies, Greeks, and trade ideas.",
    icon: "🎯",
    tag: "Options & F&O",
  },
  {
    name: "Smallcase",
    desc: "Thematic baskets of stocks and ETFs based on ideas and strategies.",
    icon: "📦",
    tag: "Thematic Portfolios",
  },
  {
    name: "Tijori",
    desc: "Comprehensive fundamental analysis and sector insights.",
    icon: "📊",
    tag: "Research",
  },
  {
    name: "Ditto",
    desc: "Honest insurance advice without spam or pushy sales.",
    icon: "🛡️",
    tag: "Insurance",
  },
];

const Apps = () => {
  return (
    <div>
      <h3 className="title">Nexvoro Ecosystem Apps</h3>
      <p className="text-muted small mb-4">
        Our ecosystem of partner products to help you invest and trade better.
      </p>

      <div className="row g-4">
        {appsList.map((app, idx) => (
          <div key={idx} className="col-md-6 col-lg-4">
            <div
              className="p-4 rounded border h-100 d-flex flex-column justify-content-between"
              style={{
                background: "var(--card-bg, #fff)",
                borderColor: "var(--border-color, #e0e3eb)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
            >
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span style={{ fontSize: "2rem" }}>{app.icon}</span>
                  <span className="badge bg-light text-primary border small">{app.tag}</span>
                </div>
                <h5 className="fw-bold mb-2">{app.name}</h5>
                <p className="text-muted small mb-3">{app.desc}</p>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm align-self-start"
              >
                Launch App &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
