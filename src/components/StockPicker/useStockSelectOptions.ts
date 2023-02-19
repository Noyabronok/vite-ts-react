// Update matching options if we receive new search results or stock selection updated by user
// 1. remove already selected stocksmap discovered stocks to selectOptions
// 2. map to and update selection options
// Important: we don't want this defined inside useEffect's async
//            in order to avoid stale selectedSymbols closure

import { useEffect, useState } from "react";
import { StockType } from "../../lib/avantage";

export function useStockSelectOptions(
  selectedStocks: StockType[],
  matchingStocks: StockType[]
) {
  const [matchingOptions, setMatchingOptions] = useState<string[]>([]); // unselected and option mapped result

  useEffect(() => {
    const selectedSymbols = selectedStocks.map((stock) => stock.symbol);

    const unselectedMatchingStocks = matchingStocks.filter(
      (stock) => !selectedSymbols.includes(stock.symbol)
    ); // remove already selected stocks

    const matchingStockOptions = unselectedMatchingStocks.map(
      (stock) => `${stock.symbol} - ${stock.name}`
    );
    setMatchingOptions(matchingStockOptions);
  }, [matchingStocks, selectedStocks]);

  return { matchingOptions };
}
