import useSWR from "swr";
import { BareFetcher, PublicConfiguration } from "swr/_internal";
import { stockOverview, StockOverview } from "../avantage";
import { useMockMode } from "../MockMode";

export type OverviewConfigType = Partial<PublicConfiguration<StockOverview, any, BareFetcher<StockOverview>>> | undefined;

// retrieves overview using swr
// dedupingInterval controls how long to use cache for to avoid making repeat requests.  Defaulting to 20 seconds
export function useStockOverview(stockSymbol: string, config: OverviewConfigType = {dedupingInterval: 20000}) {
  console.log('ALEX DEDUP INTERVAL', config)
  const controller = new AbortController();
  const signal = controller.signal;
  const { mockMode } = useMockMode();

  const { data, error, isLoading } = useSWR<StockOverview>(
    `/stock/overview/${stockSymbol}`,
    () => {
      return stockOverview(stockSymbol, signal, mockMode);
    },
    config
  );

  return {
    overview: data,
    isLoading,
    isError: error,
    abortControl: controller,
  };
}
