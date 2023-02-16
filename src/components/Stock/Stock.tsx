import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import StockHeader from "../StockHeader/StockHeader";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { Typography } from "@mui/material";
import StockRow from "../StockRow/StockRow";

export type StockOverview = {
  description: string;
  exchange: string;
  currency: string;
  country: string;
};

export type StockQuote = {
  high: string;
  low: string;
  price: string;
  change: string;
  change_percent: string;
};

export type StockType = {
  symbol: string;
  name: string;
  overview?: StockOverview;
  quote?: StockQuote;
};

export default function Stock({ stock }: { stock: StockType }) {
  const priceIncreased = stock.quote?.change_percent?.charAt(0) !== "-";

  return (
    <Card>
      <StockHeader stock={stock} />
      <CardContent>
        <Grid container spacing={0}>
          <StockRow left="Country:" right={stock.overview?.country} />
          <StockRow
            left="Price:"
            right={
              <>
                $ {stock.quote?.price} {stock.overview?.currency}
              </>
            }
          />
          <StockRow
            left="Change:"
            right={
              <>
                $ {stock.quote?.change} {stock.overview?.currency}
                <br />
                <Typography
                  color={priceIncreased ? "green" : "red"}
                  display="inline"
                  sx={{ verticalAlign: "text-bottom", pr: 1 }}
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
