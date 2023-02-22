import { useEffect } from "react";
import { StockType } from "../avantage";
import { useStockSelection } from "../StockSelection";
import { useStockOverview } from "./useStockOverview";
import { useStockQuote } from "./useStockQuote";

export function useStockDetails(stock: StockType, doUpdateStock: boolean) {
  const { updateStock } = useStockSelection();
  const { overview } = useStockOverview(stock.symbol);
  const { quote } = useStockQuote(stock.symbol);

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
    quote
  }
}