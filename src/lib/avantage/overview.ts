import { avantageFetch, RawOverviewResponse } from "./client";

export interface StockOverview {
  description: string;
  exchange: string;
  currency: string;
  country: string;
  eps: string;
}

// get stock overview details from alpha vantage, and map usable fields
export const stockOverview = async (
  symbol: string,
  abortSignal: AbortSignal,
  mockMode: boolean
): Promise<StockOverview> => {
  const response = await avantageFetch<RawOverviewResponse>(
    "OVERVIEW",
    symbol,
    abortSignal,
    mockMode
  );
  console.log("Overview response received", response);

  return {
    description: response?.Description,
    exchange: response?.Exchange,
    currency: response?.Currency,
    country: response?.Country,
    eps: response?.EPS,
  };
};
