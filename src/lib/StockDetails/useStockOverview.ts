import useSWR from "swr";
import { stockOverview, StockOverview } from "../avantage";
import { useMockMode } from "../MockMode";

export function useStockOverview(stockSymbol: string) {
  const controller = new AbortController();
  const signal = controller.signal;
  const { mockMode } = useMockMode();

  const { data, error, isLoading } = useSWR<StockOverview>(
    `/stock/overview/${stockSymbol}`,
    () => {
      return stockOverview(stockSymbol, signal, mockMode);
    }
  );

  return {
    overview: data,
    isLoading,
    isError: error,
    abortControl: controller,
  };
}
