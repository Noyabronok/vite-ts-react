import { createContext, ReactNode, useContext, useState } from "react";
import { StockType } from "../avantage";
import { useMockMode } from "./useMockMode";
import { StockSearchResults, useSearchStocks } from "./useSearchStocks";
import { useStocks } from "./useStocks";

export interface StockContextType {
  mockMode: boolean;
  toggleMockMode: () => void;
  selectedStocks: StockType[];
  updateSelectedStocks: (updatedStocks: StockType[]) => void;
  updateStock: (updatedStock: StockType) => void;
  setSearchString: (searchString: string) => void;
  searchString: string,
  stockSearchResults: StockSearchResults,
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockAPIProvider({ children }: { children: ReactNode }) {
  const { mockMode, toggleMockMode } = useMockMode();
  const { selectedStocks, updateSelectedStocks, updateStock } =
    useStocks(mockMode);

  const [searchString, setSearchString] = useState('');
  const stockSearchResults = useSearchStocks(searchString, mockMode);

  const value = {
    mockMode,
    toggleMockMode,
    selectedStocks,
    updateSelectedStocks,
    updateStock,
    setSearchString,
    searchString,
    stockSearchResults,
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
