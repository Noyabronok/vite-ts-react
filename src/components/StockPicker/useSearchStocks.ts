import { useEffect, useState } from "react";
import { stockSearch, StockType } from "../../lib/avantage";
import { mockStocks } from "../../mocks/mockStocks";

const DEBOUNCE_TIMEOUT = 400;

export function useSearchStocks(searchString: string, mockMode: boolean) {
  const [matchingStocks, setMatchingStocks] = useState<StockType[]>([]); // raw results from search
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<Error | null>(null);

  // search for matching stock options based on user input
  useEffect(() => {
    // nothing to search for, clear results if we had any
    if (!searchString) {
      setMatchingStocks([]);
      return;
    }

    if (mockMode) {
      setSearchLoading(true);
      setSearchError(null);

      try {
        const uCaseSearchString = searchString.toUpperCase();

        const matchingStocks = mockStocks.filter(
          (stock) =>
            stock.name.toUpperCase().includes(uCaseSearchString) ||
            stock.symbol.includes(uCaseSearchString)
        );
        setMatchingStocks(matchingStocks);
      } catch (error) {
        setSearchError(error as Error);
      } finally {
        setSearchLoading(false);
      }
    } else {
      const controller = new AbortController();
      const { signal } = controller;

      const fetchData = async () => {
        setSearchError(null);
        setSearchLoading(true);

        try {
          let matchingStocks = await stockSearch(searchString, signal);
          setMatchingStocks(matchingStocks);
        } catch (error) {
          setSearchError(error as Error);
        } finally {
          setSearchLoading(false);
        }
      };

      // use timeout to debounce search requests
      const searchRequest = setTimeout(() => {
        fetchData();
      }, DEBOUNCE_TIMEOUT);

      // cleanup
      return () => {
        clearTimeout(searchRequest);
        controller.abort();
        setSearchLoading(false);
      };
    }
  }, [searchString, mockMode]);

  return { matchingStocks, searchLoading, searchError };
}
