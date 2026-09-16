import React from "react";
import TopBar from "./TopBar";
import Dashboard from "./Dashboard";
import "./Dashboard.css";

const KiteHome = () => {
  return (
    <div className="dashboard-root">
      <TopBar />
      <Dashboard />
    </div>
  );
};

export default KiteHome;
