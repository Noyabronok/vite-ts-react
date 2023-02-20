import type { StockType } from "../../lib/avantage";
import { useCallback, useEffect, useState } from "react";

export function useStocks(mockMode: boolean) {
  const [selectedStocks, setSelectedStocks] = useState<StockType[]>([]);

  // clear selections on mockMode toggle
  useEffect(() => {
    setSelectedStocks([]);
  }, [mockMode]);

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
