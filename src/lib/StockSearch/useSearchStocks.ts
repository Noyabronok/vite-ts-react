import { useEffect, useState } from "react";
import { stockSearch, StockType } from "../avantage";

const DEBOUNCE_TIMEOUT = 400;

export interface StockSearchResults {
  matchingStocks: StockType[];
  searchLoading: boolean;
  searchError: Error | null;
}

// given a search string will retrieve matching stocks
export function useSearchStocks(
  searchString: string,
  mockMode: boolean
): StockSearchResults {
  const [matchingStocks, setMatchingStocks] = useState<StockType[]>([]); // raw results from search
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<Error | null>(null);

  const numStocksMatching = matchingStocks?.length;

  // clear results if not searching for anything
  // separate effect because of numStocksMatching dependency
  useEffect(() => {
    if (!searchString) {
      // don't clear stocks if already cleared
      if (numStocksMatching) {
        setMatchingStocks([]);
      }
      return;
    }
  }, [numStocksMatching, searchString]);

  // search for matching stock options based on user input
  useEffect(() => {
    // nothing to search for, clear results if we had any
    if (!searchString) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      setSearchError(null);
      setSearchLoading(true);

      try {
        let matchingStocks = await stockSearch(searchString, signal, mockMode);
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
  }, [searchString, mockMode]);

  return { matchingStocks, searchLoading, searchError };
}
