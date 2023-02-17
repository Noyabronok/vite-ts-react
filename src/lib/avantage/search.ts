import { StockOverview } from "./overview";
import { StockQuote } from "./quote";

export interface StockType {
  symbol: string;
  name: string;
  overview?: StockOverview;
  quote?: StockQuote;
};
