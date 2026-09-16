import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg glass-navbar sticky-top py-2">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src="/media/images/logo.svg"
            style={{ height: "26px", width: "auto" }}
            alt="Nexvoro"
          />
        </Link>

        <div className="d-flex align-items-center d-lg-none gap-2">
          <ThemeToggle />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-1">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/support">
                Support
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item ms-lg-2">
                  <Link
                    to="/dashboard"
                    className="btn btn-primary btn-sm px-3 py-1 fw-semibold d-flex align-items-center gap-2"
                    style={{
                      backgroundColor: "var(--accent-primary, #2563eb)",
                      borderColor: "var(--accent-primary, #2563eb)",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
                    }}
                  >
                    <span>⚡ Nexvoro Terminal</span>
                  </Link>
                </li>
                <li className="nav-item ms-lg-2 dropdown">
                  <div className="d-flex align-items-center gap-2 py-1 px-2">
                    <span
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "#e0f2fe",
                        color: "#0369a1",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        border: "1px solid #bae6fd",
                      }}
                    >
                      {user?.username?.slice(0, 2)?.toUpperCase() || "NV"}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline-secondary btn-sm py-1 px-2"
                      style={{ fontSize: "0.78rem", borderRadius: "4px" }}
                      title="Log out of Nexvoro"
                    >
                      Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ms-lg-2">
                  <Link className="nav-link fw-semibold text-primary" to="/login">
                    Sign in
                  </Link>
                </li>
                <li className="nav-item ms-lg-1">
                  <Link
                    className="btn btn-primary btn-sm px-3 py-1 fw-semibold"
                    to="/signup"
                    style={{
                      backgroundColor: "var(--accent-primary, #2563eb)",
                      borderColor: "var(--accent-primary, #2563eb)",
                      borderRadius: "6px",
                    }}
                  >
                    Get Started
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item ms-lg-3 d-none d-lg-block">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
