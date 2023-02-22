import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stock from "../Stock/Stock";
import { useStockSelection } from "../../lib/StockSelection";
import React from "react";

// lists selected stocks in a grid
export default function Stocks() {
  const { selectedStocks } = useStockSelection();

  return (
    <Container maxWidth="md" component="main">
      <Grid
        container
        spacing={1}
        px={0}
        alignItems="flex-end"
        justifyContent="center"
      >
        {selectedStocks.map((stock) => (
          <Grid item xs={12} sm={6} md={4} key={stock.symbol}>
            <Stock stock={stock} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
