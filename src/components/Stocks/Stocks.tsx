import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import type { StockType } from "../Stock/Stock";
import Stock from "../Stock/Stock";

const mockOverview = {
  description:
    "Palantir Technologies Inc. creates and implements software platforms for the intelligence community in the United States to assist in counterterrorism investigations and operations. The company is headquartered in Denver, Colorado.",
  exchange: "NYSE",
  currency: "USD",
  country: "USA",
};

const mockQuote = {
  high: "10.2300",
  low: "9.1100",
  price: "10.1100",
  change: "0.8900",
  change_percent: "9.6529%",
};

const stocks: StockType[] = [
  {
    symbol: "PLTR",
    name: "Palantir Technologies Inc - Class A",
    overview: mockOverview,
    quote: mockQuote,
  },
  {
    symbol: "PTX.FRK",
    name: "Palantir Technologies Inc",
    overview: mockOverview,
    quote: {...mockQuote, change_percent: "-5.6%"},
  },
  {
    symbol: "P2LT34.SAO",
    name: "Palantir Technologies Inc",
    overview: mockOverview,
    quote: mockQuote,
  },
  {
    symbol: "PTX.DEX",
    name: "Palantir Technologies Inc.",
    overview: mockOverview,
    quote: mockQuote,
  },
];

export default function Stocks() {
  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={1} alignItems="flex-end" justifyContent="center">
        {stocks.map((stock) => (
          <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
            <Stock stock={stock} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
