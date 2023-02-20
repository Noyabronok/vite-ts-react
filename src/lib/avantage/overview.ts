import { avantageFetch } from "./client";

export interface StockOverview {
  description: string;
  exchange: string;
  currency: string;
  country: string;
}

// there are more items returned but we don't need them
interface RawOverviewResponse {
  Description: string;
  Exchange: string;
  Currency: string;
  Country: string;
}

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
  };
};
