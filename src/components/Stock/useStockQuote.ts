import { useEffect, useState } from "react";
import { StockQuote, stockQuote, StockType } from "../../lib/avantage";

// retrieve stock quote details from api
export function useStockQuote(stock: StockType, mockMode: boolean) {
  const [quoteData, setQuoteData] = useState<StockQuote | undefined>(
    stock.quote
  );
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteError, setQuoteError] = useState<Error | null>(null);

  const stockSymbol = stock.symbol;

  useEffect(() => {
    setQuoteLoading(false);
    setQuoteError(null);

    if (quoteData) {
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
        setQuoteData(quoteResult);
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
  }, [mockMode, quoteData, stockSymbol]);

  return { quoteLoading, quoteError, quoteData };
}
