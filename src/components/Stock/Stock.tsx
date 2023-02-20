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
import { useStockOverview } from "./useStockOverview";
import { useStockQuote } from "./useStockQuote";

export interface StockProps {
  stock: StockType;
  onStockUpdated: (stock: StockType) => void;
  mockMode: boolean;
}

export default function Stock({ stock, onStockUpdated, mockMode }: StockProps) {
  const priceIncreased = stock.quote?.change_percent?.charAt(0) !== "-";
  // retrieve stock details
  const { overviewData } = useStockOverview(stock, mockMode);
  const { quoteData } = useStockQuote(stock, mockMode);

  // update stock details with retrieved data
  useEffect(() => {
    if (!stock.quote && quoteData) {
      onStockUpdated({
        ...stock,
        quote: quoteData,
      });
    } else if (!stock.overview && overviewData) {
      onStockUpdated({
        ...stock,
        overview: overviewData,
      });
    }
  }, [onStockUpdated, overviewData, quoteData, stock]);

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
            left="EPS:"
            right={
                <Typography sx={{ fontSize: "1rem" }} color={Number(stock.overview?.eps) >=0 ? "#66bb6a" : "error"}>
                  $ {stock.overview?.eps} {stock.overview?.currency}
                </Typography>
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
