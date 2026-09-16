import React, { useState, createContext } from "react";
import BuyActionWindow from "./BuyActionWindow";

export const GeneralContext = createContext({
  openBuyWindow: (uid, mode, currentPrice) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = ({ children, onOrderPlaced }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");
  const [selectedPrice, setSelectedPrice] = useState(100);

  const openBuyWindow = (uid, mode = "BUY", currentPrice = 100) => {
    setSelectedStockUID(uid);
    setOrderMode(mode);
    setSelectedPrice(currentPrice);
    setIsBuyWindowOpen(true);
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setOrderMode("BUY");
  };

  return (
    <GeneralContext.Provider value={{ openBuyWindow, closeBuyWindow }}>
      {children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          mode={orderMode}
          defaultPrice={selectedPrice}
          onSuccess={() => {
            closeBuyWindow();
            if (onOrderPlaced) onOrderPlaced();
          }}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
