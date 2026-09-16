import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleOrderPlaced = () => {
    // Trigger refresh in child components when an order is placed
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <GeneralContextProvider onOrderPlaced={handleOrderPlaced}>
      <div className="dashboard-container">
        <WatchList />
        <div className="content">
          <Routes>
            <Route path="" element={<Summary key={refreshKey} />} />
            <Route path="orders" element={<Orders key={refreshKey} />} />
            <Route path="holdings" element={<Holdings key={refreshKey} />} />
            <Route path="positions" element={<Positions key={refreshKey} />} />
            <Route path="funds" element={<Funds key={refreshKey} />} />
            <Route path="apps" element={<Apps />} />
          </Routes>
        </div>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;
