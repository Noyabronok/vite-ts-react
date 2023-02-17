import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import type { StockType } from "../Stock/Stock";
import Stock from "../Stock/Stock";

export default function Stocks({stocks}: {stocks: StockType[]}) {
  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={1} px={0} alignItems="flex-end" justifyContent="center">
        {stocks.map((stock) => (
          <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
            <Stock stock={stock} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
