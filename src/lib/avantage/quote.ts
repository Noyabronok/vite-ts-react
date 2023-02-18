import { avantageFetch } from "./client";

export interface StockQuote {
  high: string;
  low: string;
  price: string;
  change: string;
  change_percent: string;
};


// there are more items returned but we don't need them
interface RawQuoteResponse {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  }
}

export const stockQuote = async (
  symbol: string,
  abortSignal: AbortSignal
): Promise<StockQuote> => {
  const response = await avantageFetch<RawQuoteResponse>(
    "QUOTE",
    symbol,
    abortSignal
  );
  const quote = response?.["Global Quote"] || {};
  console.log("Quote response received", quote);

  return {
    high: quote["03. high"],
    low: quote["04. low"],
    price: quote["05. price"],
    change: quote["09. change"],
    change_percent: quote["10. change percent"]
  };
};
