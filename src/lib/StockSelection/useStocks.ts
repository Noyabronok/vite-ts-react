import type { StockType } from "../avantage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStocksUrl } from "./useStocksUrl";

// stocks state management
// selectedStocks -> stocks selected by the user
// updateSelectedStocks -> method to update selected stocks
// updateStock -> method to update details for one particular stock
export function useStocks(mockMode: boolean) {
  const { stocksFromUrlParams, onSelectedStocksChanged } = useStocksUrl();
  const [selectedStocks, setSelectedStocks] =
    useState<StockType[]>(stocksFromUrlParams);
  const mockModeRef = useRef(mockMode);

  // clear selections on mockMode toggle, but not on initial render
  useEffect(() => {
    if (mockModeRef.current !== mockMode && selectedStocks?.length) {
      setSelectedStocks([]);
    }
    mockModeRef.current = mockMode; // don't forget to update otherwise will stay the same forever!
  }, [mockMode, selectedStocks?.length]);

  // update the URL with selection change
  useEffect(() => {
    onSelectedStocksChanged(selectedStocks);
  }, [onSelectedStocksChanged, selectedStocks]);

  // add or remove stocks to selected list per user choice
  const updateSelectedStocks = useCallback(
    (updatedStocks: StockType[]) => {
      const newlySelectedStocks = updatedStocks.map((updatedStock) => {
        const alreadySelectedStock = selectedStocks.find(
          (selectedStock) => selectedStock.symbol === updatedStock.symbol
        );
        if (alreadySelectedStock) {
          return alreadySelectedStock;
        }
        return updatedStock;
      });

      setSelectedStocks(newlySelectedStocks);
    },
    [selectedStocks]
  );

  // handle fetch results for stock details
  const updateStock = useCallback(
    (updatedStock: StockType) => {
      const updatedStocks = selectedStocks.map((stock) =>
        stock.symbol === updatedStock.symbol ? updatedStock : stock
      );
      setSelectedStocks(updatedStocks);
    },
    [selectedStocks]
  );

  return {
    selectedStocks,
    updateSelectedStocks,
    updateStock,
  };
}
