import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow"; // renamed back from TradeActionWindow

const GeneralContext = React.createContext({
  openTradeWindow: (uid, mode) => {},
  closeTradeWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isTradeWindowOpen, setIsTradeWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [tradeMode, setTradeMode] = useState("BUY"); // "BUY" or "SELL"

  // Open trade window with mode
  const handleOpenTradeWindow = (uid, mode = "BUY") => {
    setSelectedStockUID(uid);
    setTradeMode(mode);
    setIsTradeWindowOpen(true);
  };

  const handleCloseTradeWindow = () => {
    setIsTradeWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openTradeWindow: handleOpenTradeWindow,
        closeTradeWindow: handleCloseTradeWindow,
      }}
    >
      {props.children}
      {isTradeWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} mode={tradeMode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
