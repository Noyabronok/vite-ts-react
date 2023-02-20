import { useCallback } from "react";
import { StockType } from "../../lib/avantage";
import { useSearchParams } from "react-router-dom";

const STOCKS_URL_PARAM_KEY = "stocks";

// update the URL with stock selection so that selection can be shared
// We could store just the stock symbol to make the URL smaller, but then we'd 
//    need to extract the name from summary call, which sometimes fails,
//    so just keep the name in the URL since we already have it
export function useStocksUrl() {
  const [searchParams, setSearchParams] = useSearchParams();
  const stocksFromUrlParams: StockType[] = JSON.parse(searchParams.get(STOCKS_URL_PARAM_KEY) || '[]');

  const onSelectedStocksChanged = useCallback((selectedStocks: StockType[]) => {
    const selectedStocksAsUrlParams = selectedStocks.map((stock) =>
      JSON.stringify({ symbol: stock.symbol, name: stock.name })
    );
    searchParams.set(STOCKS_URL_PARAM_KEY, JSON.stringify(selectedStocksAsUrlParams));
  
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);
  
  return {stocksFromUrlParams, onSelectedStocksChanged};
}
