import { avantageFetch } from "./client";

export interface StockQuote {
  high: string;
  low: string;
  price: string;
  change: string;
  change_percent: string;
}

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
  };
}

const formatCurrency = (raw: string): string =>
  raw ? Number(raw).toFixed(2) : "";

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
  console.log("Quote response received", quote);

  return {
    high: formatCurrency(quote["03. high"]),
    low: formatCurrency(quote["04. low"]),
    price: formatCurrency(quote["05. price"]),
    change: formatCurrency(quote["09. change"]),
    change_percent: quote["10. change percent"],
  };
};
