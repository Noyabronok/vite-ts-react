import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import StockHeader from "../StockHeader/StockHeader";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { Typography } from "@mui/material";
import StockRow from "../StockRow/StockRow";
import type { StockType } from "../../lib/avantage";
import { useEffect } from "react";
import { stockOverview, stockQuote } from "../../lib/avantage";

export interface StockProps {
  stock: StockType;
  onStockUpdated: (stock: StockType) => void;
}

export default function Stock({ stock, onStockUpdated }: StockProps) {
  const priceIncreased = stock.quote?.change_percent?.charAt(0) !== "-";

  useEffect(() => {
    if (stock.overview || stock.quote) {
      return; // we already have the data, so nothing to query
    }

    const overviewAbortController = new AbortController();
    const overviewSignal = overviewAbortController.signal;

    const quoteAbortController = new AbortController();
    const quoteSignal = quoteAbortController.signal;

    const fetchDetails = async () => {
      try {
        //TODO use Promise.allSettled to fetch in parallel
        let overview = stock.overview;
        if (!overview) {
          overview = await stockOverview(stock.symbol, overviewSignal);
        }

        let quote = stock.quote;
        if (!stock.quote) {
          quote = await stockQuote(stock.symbol, quoteSignal);
        }

        onStockUpdated({
          ...stock,
          overview,
          quote,
        });
      } catch (error) {
        console.error(
          `Failed detail fetch for stock [${stock.symbol}]`,
          (error as Error)?.message
        );
      }
    };

    fetchDetails();

    return () => {
      overviewAbortController.abort();
      quoteAbortController.abort();
    };
  }, [onStockUpdated, stock]);

  let changeArrow = <></>;

  if (stock.quote?.change_percent) {
    changeArrow = priceIncreased ? (
      <ArrowUpward color="success" />
    ) : (
      <ArrowDownward color="error" />
    );
  }

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
                {changeArrow}
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
