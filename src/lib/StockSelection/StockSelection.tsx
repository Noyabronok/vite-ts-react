import { createContext, ReactNode, useContext } from "react";
import { StockType } from "../avantage";
import { useMockMode } from "../MockMode";
import { useStocks } from "./useStocks";

export interface StockSelectionType {
  selectedStocks: StockType[];
  updateSelectedStocks: (updatedStocks: StockType[]) => void;
  updateStock: (updatedStock: StockType) => void;
}

const StockSelectionContext = createContext<StockSelectionType | undefined>(undefined);

export function StockSelectionProvider({ children }: { children: ReactNode }) {
  const { mockMode } = useMockMode();
  const { selectedStocks, updateSelectedStocks, updateStock } =
    useStocks(mockMode);

  const value = {
    selectedStocks,
    updateSelectedStocks,
    updateStock,
  };

  return (
    <StockSelectionContext.Provider value={value}>{children}</StockSelectionContext.Provider>
  );
}

export function useStockSelection() {
  const context = useContext(StockSelectionContext);

  if (context === undefined) {
    throw new Error("useStockSelection must be used within a StockSelectionProvider");
  }
  return context;
}
