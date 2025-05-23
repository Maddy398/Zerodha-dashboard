import React, { useState, createContext } from "react";
import TradeActionWindow from "./TradeActionWindow"; // Single unified trade window

const GeneralContext = createContext({
  openTradeWindow: (uid, mode) => {},
  closeTradeWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [isTradeWindowOpen, setIsTradeWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [tradeMode, setTradeMode] = useState("BUY"); // "BUY" or "SELL"

  const openTradeWindow = (uid, mode = "BUY") => {
    setSelectedStockUID(uid);
    setTradeMode(mode);
    setIsTradeWindowOpen(true);
  };

  const closeTradeWindow = () => {
    setIsTradeWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openTradeWindow,
        closeTradeWindow,
      }}
    >
      {children}
      {isTradeWindowOpen && (
        <TradeActionWindow uid={selectedStockUID} mode={tradeMode} onClose={closeTradeWindow} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

