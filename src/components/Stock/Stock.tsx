import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import StockHeader from "../StockHeader/StockHeader";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { Typography } from "@mui/material";
import StockRow from "../StockRow/StockRow";
import type {StockType } from "../../lib/avantage";
import { useEffect } from "react";
import { stockOverview } from "../../lib/avantage";

export interface StockProps {
  stock: StockType;
  onStockUpdated: (stock: StockType) => void;
}

export default function Stock({ stock, onStockUpdated }: StockProps) {
  const priceIncreased = stock.quote?.change_percent?.charAt(0) !== "-";
  
  useEffect(() => {
    console.log(
      "New stock selected, load rest of data here",
      stock.symbol,
      stock.overview
    );
    if (stock.overview) {
      return; // we already have the data, so nothing to query
    }
    const overviewAbortController = new AbortController();
    const overviewSignal = overviewAbortController.signal;

    const fetchSummary = async () => {
      try {
        const newOverview = await stockOverview(stock.symbol, overviewSignal);
        onStockUpdated({
          ...stock,
          overview: newOverview,
        });
      } catch (error) {
        console.log(`Failed overview fetch for ${stock.symbol}`, error);
      }
    };

    fetchSummary();

    return () => overviewAbortController.abort();
  }, [onStockUpdated, stock]);

  return (
    <Card component="article">
      <StockHeader stock={stock} />
      <CardContent>
        <Grid container spacing={0}>
          <StockRow left="Country:" right={stock.overview?.country} pb={2} />
          <StockRow
            left="Price:"
            right={
              <Typography sx={{ fontSize: "1.2rem" }}>
                $ {stock.quote?.price} {stock.overview?.currency}
              </Typography>
            }
          />
          <StockRow
            left="Change:"
            right={
              <>
                <Typography sx={{ fontSize: "1rem" }}>
                  $ {stock.quote?.change} {stock.overview?.currency}
                </Typography>
                <Typography
                  color={priceIncreased ? "#66bb6a" : "error"}
                  display="inline"
                  sx={{
                    verticalAlign: "text-bottom",
                    pr: 1,
                    fontSize: "1.2rem",
                  }}
                >
                  {stock.quote?.change_percent}
                </Typography>
                {priceIncreased ? (
                  <ArrowUpward color="success" />
                ) : (
                  <ArrowDownward color="error" />
                )}
              </>
            }
          />

          <StockRow
            left={
              <Typography variant="h5" py={2}>
                Stats
              </Typography>
            }
          />
          <StockRow
            left="High:"
            right={
              <>
                $ {stock.quote?.high} {stock.overview?.currency}
              </>
            }
          />
          <StockRow
            left="Low:"
            right={
              <>
                $ {stock.quote?.low} {stock.overview?.currency}
              </>
            }
          />
        </Grid>
      </CardContent>
    </Card>
  );
}
