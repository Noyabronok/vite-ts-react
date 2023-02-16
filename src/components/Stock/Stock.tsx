import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import StockHeader from '../StockHeader/StockHeader';

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
  return (
    <Grid item key={stock.symbol} xs={12} sm={6} md={4}>
      <Card>
        <StockHeader stock={stock} />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              mb: 2,
            }}
          >
            <Typography color="text.primary">
              {stock.overview?.country}
              <br />
              {stock.overview?.currency}
              <br />
              {stock.quote?.price}
              <br />
              {stock.quote?.high}
              <br />
              {stock.quote?.low}
              <br />
              {stock.quote?.change}
              <br />
              {stock.quote?.change_percent}
              <br />
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
