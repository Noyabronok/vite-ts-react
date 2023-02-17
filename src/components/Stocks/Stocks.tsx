import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import type { StockType } from "../../lib/avantage";
import Stock from "../Stock/Stock";

export interface StocksProps {
  stocks: StockType[];
  mockMode: boolean;
}

export default function Stocks({ stocks, mockMode }: StocksProps) {
  return (
    <Container maxWidth="md" component="main">
      <Grid
        container
        spacing={1}
        px={0}
        alignItems="flex-end"
        justifyContent="center"
      >
        {stocks.map((stock) => (
          <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
            <Stock stock={stock} mockMode={mockMode} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
