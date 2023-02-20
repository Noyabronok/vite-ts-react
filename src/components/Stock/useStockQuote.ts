import { useEffect, useState } from "react";
import { StockQuote, stockQuote, StockType } from "../../lib/avantage";

export function useStockQuote(stock: StockType, mockMode: boolean) {
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<Error | null>(null);

  const stockSymbol = stock.symbol;

  useEffect(() => {
    setQuoteLoading(false);
    setQuoteError(null);
    
    if (quote) {
      return;
    }

    const quoteAbortController = new AbortController();
    const quoteSignal = quoteAbortController.signal;

    const fetchQuote = async () => {
      try {
        setQuoteLoading(true);
        const quoteResult = await stockQuote(
          stockSymbol,
          quoteSignal,
          mockMode
        );
        setQuote(quoteResult);
      } catch (error) {
        console.error(
          `Failed quote fetch for stock [${stockSymbol}]`,
          (error as Error)?.message
        );
        setQuoteError(error as Error);
      } finally {
        setQuoteLoading(false);
      }
    };

    fetchQuote();

    return () => {
      quoteAbortController.abort();
    };
  }, [mockMode, quote, stockSymbol]);

  return [quoteLoading, quoteError, quote];
}
