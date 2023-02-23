import type { StockType } from "../avantage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStocksUrl } from "./useStocksUrl";
import { useSWRConfig } from "swr";

// stocks state management
// selectedStocks -> stocks selected by the user
// updateSelectedStocks -> method to update selected stocks
// updateStock -> method to update details for one particular stock
export function useStocks(mockMode: boolean) {
  const { stocksFromUrlParams, updateUrlWithStockSelection } = useStocksUrl();
  const [selectedStocks, setSelectedStocks] =
    useState<StockType[]>(stocksFromUrlParams);
  const mockModeRef = useRef(mockMode);
  const { mutate: swrMutate } = useSWRConfig();

  // clear selections on mockMode toggle, but not on initial render
  useEffect(() => {
    if (mockModeRef.current !== mockMode && selectedStocks?.length) {
      setSelectedStocks([]);

      // clear swr cache
      swrMutate(
        key => true, // which cache keys are updated
        undefined, // update cache data to `undefined`
        { revalidate: false } // do not revalidate
      )
    }
    mockModeRef.current = mockMode; // don't forget to update otherwise will stay the same forever!
  }, [mockMode, swrMutate, selectedStocks?.length]);

  // update the URL with selection change
  useEffect(() => {
    updateUrlWithStockSelection(selectedStocks);
  }, [updateUrlWithStockSelection, selectedStocks]);

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
