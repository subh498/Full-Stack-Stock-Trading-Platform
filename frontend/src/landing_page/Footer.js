import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--bg-secondary, #fafafa)",
        borderTop: "1px solid var(--border-color, #e0e3eb)",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <Link to="/" className="d-inline-block mb-3">
              <img src="/media/images/logo.svg" alt="Nexvoro Logo" style={{ height: "26px" }} />
            </Link>
            <p className="text-muted small pe-lg-4">
              Nexvoro Technologies Pvt. Ltd. Next-generation quantitative trading terminal, institutional-grade market data, and algorithmic intelligence for modern retail investors.
            </p>
            <p className="text-muted small">
              &copy; {new Date().getFullYear()} Nexvoro Technologies. All rights reserved.
            </p>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <p className="fw-bold mb-3 small" style={{ color: "var(--text-primary)" }}>Platform</p>
            <div className="d-flex flex-column gap-2 small">
              <Link to="/dashboard" className="text-muted">Nexvoro Terminal</Link>
              <Link to="/product" className="text-muted">Nexvoro Pulse</Link>
              <Link to="/product" className="text-muted">Quant API SDK</Link>
              <Link to="/pricing" className="text-muted">Pricing &amp; Margins</Link>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <p className="fw-bold mb-3 small" style={{ color: "var(--text-primary)" }}>Company</p>
            <div className="d-flex flex-column gap-2 small">
              <Link to="/about" className="text-muted">About Nexvoro</Link>
              <Link to="/about" className="text-muted">Leadership &amp; Team</Link>
              <Link to="/product" className="text-muted">Technology Architecture</Link>
              <Link to="/support" className="text-muted">Research Lab</Link>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <p className="fw-bold mb-3 small" style={{ color: "var(--text-primary)" }}>Support &amp; Learn</p>
            <div className="d-flex flex-column gap-2 small">
              <Link to="/support" className="text-muted">Help &amp; Documentation</Link>
              <Link to="/support" className="text-muted">Support Portal</Link>
              <Link to="/about" className="text-muted">Nexvoro Academy</Link>
              <Link to="/pricing" className="text-muted">Brokerage Calculator</Link>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-6">
            <p className="fw-bold mb-3 small" style={{ color: "var(--text-primary)" }}>Account</p>
            <div className="d-flex flex-column gap-2 small">
              <Link to="/signup" className="text-muted">Open Demat Account</Link>
              <Link to="/login" className="text-muted">Trader Login</Link>
              <Link to="/dashboard/funds" className="text-muted">Fund Management</Link>
              <Link to="/dashboard/orders" className="text-muted">Order Book</Link>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-top text-muted" style={{ fontSize: "12px", lineHeight: "1.7", borderColor: "var(--border-subtle, #eee)" }}>
          <p className="mb-2">
            Nexvoro Technologies Pvt. Ltd.: Member of NSE &amp; BSE – SEBI Registration no.: INZ000088921. Depository Participant: CDSL / NSDL. Commodity trading facilities provided through Nexvoro Multi-Asset Ltd. MCX Reg: 58210. Registered Address: Nexvoro Tower, FinTech Hub, Outer Ring Road, Bengaluru, Karnataka, India.
          </p>
          <p className="mb-2">
            For complaints and support queries, please open a ticket on our Support Portal or email support@nexvoro.com. Risk Disclosure: Investments in securities market are subject to market risks; read all scheme-related and risk disclosure documents carefully before executing trades.
          </p>
          <p className="mb-0">
            Nexvoro does not provide stock tips or advisory services. We never ask for client credentials or authorize third-party trade execution. Protect your trading account with two-factor authentication and verify all transaction alerts.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
