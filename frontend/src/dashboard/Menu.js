import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

const Menu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const currentPath = location.pathname;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.username?.slice(0, 2).toUpperCase() || "TR";

  return (
    <div className="menu-container">
      <div className="menu-logo-wrap">
        <Link to="/dashboard">
          <img src="/media/images/logo.svg" className="menu-logo" alt="Nexvoro Trade" />
        </Link>
      </div>

      <div className="menus">
        <ul>
          <li>
            <Link
              className={`menu-link ${currentPath === "/dashboard" ? "selected" : ""}`}
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className={`menu-link ${currentPath === "/dashboard/orders" ? "selected" : ""}`}
              to="/dashboard/orders"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              className={`menu-link ${currentPath === "/dashboard/holdings" ? "selected" : ""}`}
              to="/dashboard/holdings"
            >
              Holdings
            </Link>
          </li>
          <li>
            <Link
              className={`menu-link ${currentPath === "/dashboard/positions" ? "selected" : ""}`}
              to="/dashboard/positions"
            >
              Positions
            </Link>
          </li>
          <li>
            <Link
              className={`menu-link ${currentPath === "/dashboard/funds" ? "selected" : ""}`}
              to="/dashboard/funds"
            >
              Funds
            </Link>
          </li>
          <li>
            <Link
              className={`menu-link ${currentPath === "/dashboard/apps" ? "selected" : ""}`}
              to="/dashboard/apps"
            >
              Apps
            </Link>
          </li>
        </ul>

        <div className="profile-wrap" ref={dropdownRef}>
          <ThemeToggle />

          <div className="profile" onClick={() => setDropdownOpen((prev) => !prev)}>
            <div className="avatar">{initials}</div>
            <p className="username">{user?.username || "Trader"}</p>
            <span style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>▼</span>
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-user-info">
                <h6>{user?.fullName || "Trading Account"}</h6>
                <p>@{user?.username} • {user?.email}</p>
              </div>

              <div className="dropdown-balance">
                <span>Available Cash</span>
                <span>
                  ₹{Number(user?.funds || 0).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div style={{ padding: "4px 0 10px 0" }}>
                <Link
                  to="/"
                  className="menu-link"
                  style={{ fontSize: "0.82rem", display: "block", marginBottom: "6px" }}
                  onClick={() => setDropdownOpen(false)}
                >
                  🌐 Nexvoro Website
                </Link>
              </div>

              <button
                type="button"
                className="dropdown-logout-btn"
                onClick={handleLogout}
              >
                Sign out of Nexvoro
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
