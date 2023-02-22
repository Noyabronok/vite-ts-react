import { createContext, ReactNode, useContext } from "react";
import { StockType } from "../avantage";
import { useMockMode } from "./useMockMode";
import { useStocks } from "./useStocks";

export interface StockContextType {
  mockMode: boolean;
  toggleMockMode: () => void;
  selectedStocks: StockType[];
  updateSelectedStocks: (updatedStocks: StockType[]) => void;
  updateStock: (updatedStock: StockType) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockAPIProvider({ children }: { children: ReactNode }) {
  const { mockMode, toggleMockMode } = useMockMode();
  const { selectedStocks, updateSelectedStocks, updateStock } =
    useStocks(mockMode);

  const value = {
    mockMode,
    toggleMockMode,
    selectedStocks,
    updateSelectedStocks,
    updateStock,
  };

  return (
    <StockContext.Provider value={value}>{children}</StockContext.Provider>
  );
}

export function useStockAPI() {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error("useStockAPI must be used within a StockAPIProvider");
  }
  return context;
}
