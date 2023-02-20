import { useEffect, useState } from "react";
import { StockOverview, stockOverview, StockType } from "../../lib/avantage";

export function useStockOverview(stock: StockType, mockMode: boolean) {
  const [overview, setOverview] = useState<StockOverview | null>(null);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [overviewError, setOverviewError] = useState<Error | null>(null);

  const stockSymbol = stock.symbol;

  useEffect(() => {
    setOverviewLoading(false);
    setOverviewError(null);

    if (overview) {
      return;
    }

    const overviewAbortController = new AbortController();
    const overviewSignal = overviewAbortController.signal;

    const fetchOverview = async () => {
      try {
        setOverviewLoading(true);
        const overviewResult = await stockOverview(
          stockSymbol,
          overviewSignal,
          mockMode
        );
        setOverview(overviewResult);
      } catch (error) {
        console.error(
          `Failed overview fetch for stock [${stockSymbol}]`,
          (error as Error)?.message
        );
        setOverviewError(error as Error);
      } finally {
        setOverviewLoading(false);
      }
    };

    fetchOverview();

    return () => {
      overviewAbortController.abort();
    };
  }, [mockMode, overview, stockSymbol]);

  return [overviewLoading, overviewError, overview];
}
