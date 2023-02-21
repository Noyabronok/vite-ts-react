import { StockOverview } from "./overview";
import { StockQuote } from "./quote";
import { avantageFetch, RawSearchResponse } from "./client";

export interface StockType {
  symbol: string;
  name: string;
  overview?: StockOverview;
  quote?: StockQuote;
}

// get stock overview details from alpha vantage, and map usable fields
export const stockSearch = async (
  input: string,
  abortSignal: AbortSignal,
  mockMode: boolean
): Promise<StockType[]> => {
  const response = await avantageFetch<RawSearchResponse>(
    "SEARCH",
    input,
    abortSignal,
    mockMode
  );

  const stocks = response.bestMatches.map((stock) => {
    return { name: stock["2. name"], symbol: stock["1. symbol"] } as StockType;
  }) as StockType[];

  return stocks;
};
