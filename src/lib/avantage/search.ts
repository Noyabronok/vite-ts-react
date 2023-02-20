import { StockOverview } from "./overview";
import { StockQuote } from "./quote";
import { avantageFetch } from "./client";

export interface StockType {
  symbol: string;
  name: string;
  overview?: StockOverview;
  quote?: StockQuote;
}

interface SearchResultItem {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

interface RawSearchResponse {
  bestMatches: SearchResultItem[];
}

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
