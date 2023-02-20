import type { StockType } from "../../lib/avantage";
import { useCallback, useEffect, useState } from "react";
import { useStocksUrl } from "./useStocksUrl";

export function useStocks(mockMode: boolean) {
  const {stocksFromUrlParams, onSelectedStocksChanged} = useStocksUrl();
  const [selectedStocks, setSelectedStocks] =
    useState<StockType[]>(stocksFromUrlParams);

  // clear selections on mockMode toggle
  useEffect(() => {
    setSelectedStocks([]);
  }, [mockMode]);

  // update the URL with selection change
  useEffect(() => {
    onSelectedStocksChanged(selectedStocks);
  },[onSelectedStocksChanged, selectedStocks])

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

  return { selectedStocks, updateSelectedStocks, updateStock };
}


