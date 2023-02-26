import { useCallback } from "react";
import { StockType } from "../avantage";
import { useSearchParams } from "react-router-dom";

const STOCKS_URL_PARAM_KEY = "stocks";
const STOCKS_URL_DELIMITER = "~";

// update the URL with stock selection so that selection can be shared
// We could store just the stock symbol to make the URL smaller, but then we'd
//    need to extract the name from summary call, which sometimes fails,
//    so just keep the name in the URL since we already have it
export function useStocksUrl() {
  const [searchParams, setSearchParams] = useSearchParams();

  const stocksFromUrlParams: StockType[] = (
    searchParams.get(STOCKS_URL_PARAM_KEY)
  )?.split(STOCKS_URL_DELIMITER)?.map(symbol => ({symbol})) || [];

  const updateUrlWithStockSelection = useCallback(
    (selectedStocks: StockType[]) => {
      const selectedStocksAsUrlParams = selectedStocks.map(stock => stock.symbol);

      if (selectedStocksAsUrlParams?.length) {
        searchParams.set(
          STOCKS_URL_PARAM_KEY,
          selectedStocksAsUrlParams.join(STOCKS_URL_DELIMITER)
        );
        setSearchParams(searchParams);
      } else if (searchParams.has(STOCKS_URL_PARAM_KEY)) {
        // only maintain url state if we have items, otherwise keep the url clean
        // also helps prevent unnecessary rerenders
        searchParams.delete(STOCKS_URL_PARAM_KEY);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams]
  );

  return { stocksFromUrlParams, updateUrlWithStockSelection };
}
