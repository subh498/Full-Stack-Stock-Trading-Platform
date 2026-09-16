import React from "react";

function CreateTicket() {
  const topics = [
    {
      title: "Account & KYC",
      icon: "fa-user-circle",
      links: [
        "Online Digital Onboarding",
        "Segment Activation (F&O, MCX)",
        "Demat & Bank Account Linking",
        "NRI & Corporate Accounts",
        "Charges & Brokerage Schedule",
      ],
    },
    {
      title: "Nexvoro Terminal",
      icon: "fa-line-chart",
      links: [
        "Web Terminal Navigation",
        "Chart Indicators & Studies",
        "Market Depth & Watchlist Setup",
        "Order Types (Limit, Market, SL)",
        "Dark & Light Mode Customization",
      ],
    },
    {
      title: "Trading & Orders",
      icon: "fa-exchange",
      links: [
        "Placing Buy & Sell Orders",
        "Margin Requirements & Leverage",
        "Intraday Auto Square-Off Timings",
        "Order Book & Cancellation",
        "Corporate Actions & Dividends",
      ],
    },
    {
      title: "Funds & UPI",
      icon: "fa-money",
      links: [
        "Instant UPI Fund Additions",
        "Withdrawal Processing Windows",
        "Bank Mandates & Netbanking",
        "Settlement & T+1 Timelines",
        "Failed Payments & Refund Status",
      ],
    },
    {
      title: "Quant API & SDK",
      icon: "fa-code",
      links: [
        "Generating API Credentials",
        "WebSocket Real-Time Quotes",
        "Python / Node.js SDK Documentation",
        "Algorithmic Rate Limits & Policies",
        "Backtesting Sandbox Access",
      ],
    },
    {
      title: "Reports & Tax P&L",
      icon: "fa-file-text-o",
      links: [
        "Comprehensive Tax P&L Statement",
        "Daily Trade Confirmation Notes",
        "Annual Capital Gains Report",
        "Holding Statements & Ledger",
        "e-DIS & CDSL Authorization",
      ],
    },
  ];

  return (
    <div className="container py-5 my-3">
      <div className="text-center mb-5">
        <h2 className="fs-2 fw-bold" style={{ color: "var(--text-primary)" }}>
          Nexvoro Help Desk &amp; Knowledge Base
        </h2>
        <p className="text-muted small">
          Select a category below or browse our technical documentation to find quick solutions.
        </p>
      </div>

      <div className="row g-4">
        {topics.map((topic, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <div
              className="p-4 rounded border h-100"
              style={{
                background: "var(--card-bg, #fff)",
                borderColor: "var(--border-color, #e0e3eb)",
                boxShadow: "var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.04))",
              }}
            >
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <i className={`fa ${topic.icon} text-primary`} aria-hidden="true"></i>
                <span>{topic.title}</span>
              </h5>
              <ul className="list-unstyled mb-0 d-flex flex-column gap-2 small">
                {topic.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#help"
                      className="text-muted text-decoration-none"
                      style={{ transition: "color 0.15s ease" }}
                    >
                      {link} &rarr;
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;
