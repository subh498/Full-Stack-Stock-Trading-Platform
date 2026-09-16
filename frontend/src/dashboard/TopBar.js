import React from "react";
import Menu from "./Menu";

const TopBar = ({ onTabSelect, selectedTab }) => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">24,350.60</p>
          <p className="percent">(+0.45%)</p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">79,890.20</p>
          <p className="percent">(+0.38%)</p>
        </div>
      </div>

      <Menu onTabSelect={onTabSelect} selectedTab={selectedTab} />
    </div>
  );
};

export default TopBar;
