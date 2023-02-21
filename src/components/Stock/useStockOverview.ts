import { useEffect, useState } from "react";
import { StockOverview, stockOverview, StockType } from "../../lib/avantage";

// retrieve stock overview details from api
export function useStockOverview(stock: StockType, mockMode: boolean) {
  const [overviewData, setOverviewData] = useState<StockOverview | undefined>(
    stock.overview
  );
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [overviewError, setOverviewError] = useState<Error | null>(null);

  const stockSymbol = stock.symbol;

  useEffect(() => {
    setOverviewLoading(false);
    setOverviewError(null);

    if (overviewData) {
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
        setOverviewData(overviewResult);
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
  }, [mockMode, overviewData, stockSymbol]);

  return { overviewLoading, overviewError, overviewData };
}
