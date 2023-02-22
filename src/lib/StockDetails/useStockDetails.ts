import { useEffect } from "react";
import { StockType } from "../avantage";
import { useStockSelection } from "../StockSelection";
import { useStockOverview } from "./useStockOverview";
import { useStockQuote } from "./useStockQuote";

/**
 * Request for overview and quote data to be loaded for the stock
 * @param stock the stock to load details for
 * @param doUpdateStock if true will update the stock object in SelectionContext with result
 * @returns retrieved details and loading state or error
 */
export function useStockDetails(stock: StockType, doUpdateStock: boolean) {
  const { updateStock } = useStockSelection();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const dedupingInterval = urlSearchParams.get("dedupingInterval");

  let config;
  if (Number.isInteger(dedupingInterval)) {
    config = {
      dedupingInterval: Number(dedupingInterval)
    }
  };

  const { overview } = useStockOverview(stock.symbol, config);
  const { quote } = useStockQuote(stock.symbol, config);

  // update stock details with retrieved data, unless flagged not to
  useEffect(() => {
    if (!doUpdateStock) {
      return;
    }

    if (!stock.quote && quote) {
      updateStock({
        ...stock,
        quote,
      });
    } else if (!stock.overview && overview) {
      updateStock({
        ...stock,
        overview,
      });
    }
  }, [updateStock, overview, quote, stock, doUpdateStock]);

  return {
    overview,
    quote,
  };
}
