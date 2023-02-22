import useSWR, { BareFetcher } from "swr";
import { PublicConfiguration } from "swr/_internal";
import { stockQuote, StockQuote } from "../avantage";
import { useMockMode } from "../MockMode";

export type QuoteConfigType = Partial<PublicConfiguration<StockQuote, any, BareFetcher<StockQuote>>> | undefined;

// retrieves quote using swr
// dedupingInterval controls how long to use cache for to avoid making repeat requests.  Defaulting to 20 seconds
export function useStockQuote(stockSymbol: string, config: QuoteConfigType = {dedupingInterval: 20000}) {
  const controller = new AbortController();
  const signal = controller.signal;
  const { mockMode } = useMockMode();

  const { data, error, isLoading } = useSWR<StockQuote>(
    `/stock/quote/${stockSymbol}`,
    () => {
      return stockQuote(stockSymbol, signal, mockMode);
    },
    config
  );

  return {
    quote: data,
    isLoading,
    isError: error,
    abortControl: controller,
  };
}
