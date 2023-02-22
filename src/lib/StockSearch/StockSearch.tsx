import { createContext, ReactNode, useContext, useState } from "react";
import { useMockMode } from "../MockMode";
import { StockSearchResults, useSearchStocks } from "./useSearchStocks";

export interface StockSearchType {
  setSearchString: (searchString: string) => void;
  searchString: string,
  stockSearchResults: StockSearchResults,
}

const StockSearch = createContext<StockSearchType | undefined>(undefined);

// provides searching for mocks APIs
// kept separate from StockSelection to avoid rerendering selected stock components
export function StockSearchProvider({ children }: { children: ReactNode }) {
  const { mockMode } = useMockMode();

  const [searchString, setSearchString] = useState('');
  const stockSearchResults = useSearchStocks(searchString, mockMode);

  const value = {
    setSearchString,
    searchString,
    stockSearchResults,
  };

  return (
    <StockSearch.Provider value={value}>{children}</StockSearch.Provider>
  );
}

export function useStockSearch() {
  const context = useContext(StockSearch);

  if (context === undefined) {
    throw new Error("useStockSearch must be used within a StockSearchProvider");
  }
  return context;
}
