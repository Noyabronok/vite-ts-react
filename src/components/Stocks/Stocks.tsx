import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import type { StockType } from "../../lib/avantage";
import Stock from "../Stock/Stock";

export interface StocksProps {
  stocks: StockType[];
  onStockUpdated: (stock: StockType) => void;
  mockMode: boolean;
}

export default function Stocks({ stocks, ...rest}: StocksProps) {
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
            <Stock stock={stock} {...rest} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
