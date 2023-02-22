import { avantageFetch, RawQuoteResponse } from "./client";

export interface StockQuote {
  high: string;
  low: string;
  price: string;
  change: string;
  change_percent: string;
}

// get stock quote details from alpha vantage, and map usable fields
export const stockQuote = async (
  symbol: string,
  abortSignal: AbortSignal,
  mockMode: boolean
): Promise<StockQuote> => {
  const response = await avantageFetch<RawQuoteResponse>(
    "QUOTE",
    symbol,
    abortSignal,
    mockMode
  );
  const quote = response?.["Global Quote"] || {};

  return {
    high: quote["03. high"],
    low: quote["04. low"],
    price: quote["05. price"],
    change: quote["09. change"],
    change_percent: quote["10. change percent"],
  };
};
