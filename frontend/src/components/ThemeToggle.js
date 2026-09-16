import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle-btn ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle theme"
      style={{
        background: isDark ? "#2a2e39" : "#f1f3f6",
        border: isDark ? "1px solid #3c4250" : "1px solid #e0e3eb",
        borderRadius: "20px",
        padding: "4px 10px",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.82rem",
        fontWeight: 500,
        color: isDark ? "#f3f4f6" : "#44475b",
        transition: "all 0.2s ease-in-out",
      }}
    >
      {isDark ? (
        <>
          <span style={{ fontSize: "1rem" }}>☀️</span>
          <span>Light</span>
        </>
      ) : (
        <>
          <span style={{ fontSize: "1rem" }}>🌙</span>
          <span>Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
