import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import StockHeader from "../StockHeader/StockHeader";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { Typography } from "@mui/material";
import StockRow from "../StockRow/StockRow";
import type { StockType } from "../../lib/avantage";
import { useCallback, useEffect } from "react";
import { useStockOverview } from "./useStockOverview";
import { useStockQuote } from "./useStockQuote";
import { useStockSelection } from "../../lib/StockSelection";
import { useMockMode } from "../../lib/MockMode";

export interface StockProps {
  stock: StockType;
}

// single stock card 
// retrieves stock details when loaded if details are missing
export default function Stock({ stock }: StockProps) {
  const {mockMode} = useMockMode();
  const {updateStock} = useStockSelection();

  // retrieve stock details
  // TODO use loading/error indicators from the hooks to provide feedback to the user
  const { overviewData } = useStockOverview(stock, mockMode);
  const { quoteData } = useStockQuote(stock, mockMode);

  // update stock details with retrieved data
  useEffect(() => {
    if (!stock.quote && quoteData) {
      updateStock({
        ...stock,
        quote: quoteData,
      });
    } else if (!stock.overview && overviewData) {
      updateStock({
        ...stock,
        overview: overviewData,
      });
    }
  }, [updateStock, overviewData, quoteData, stock]);

  const formatCurrency = useCallback(
    (raw: string | number | undefined) => {
      if (!raw) return "";

      const amount = Math.abs(Number(raw)).toFixed(2);
      const sign = Number(raw) < 0 ? "- " : "";

      return `${sign}$ ${amount} ${stock.overview?.currency || ''}`;
    },
    [stock]
  );

  const priceIncreased = stock.quote?.change_percent?.charAt(0) !== "-";
  let changeArrow = <></>;

  if (stock.quote?.change_percent) {
    changeArrow = priceIncreased ? (
      <ArrowUpward color="success" />
    ) : (
      <ArrowDownward color="error" />
    );
  }

  return (
    <Card component="article" aria-label={stock.symbol}>
      <StockHeader stock={stock} />
      <CardContent>
        <Grid container spacing={0}>
          <StockRow
            left="Country"
            right={stock.overview?.country}
            pb={2}
          />
          <StockRow
            left="Price"
            right={
              <Typography sx={{ fontSize: "1.2rem" }}>
                {formatCurrency(stock.quote?.price)}
              </Typography>
            }
          />
          <StockRow
            left="Change"
            right={
              <>
                <Typography sx={{ fontSize: "1rem" }}>
                  {formatCurrency(stock.quote?.change)}
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
            left="EPS"
            right={
              <Typography
                sx={{ fontSize: "1rem" }}
                color={Number(stock.overview?.eps) >= 0 ? "#66bb6a" : "error"}
              >
                {formatCurrency(stock.overview?.eps)}
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
            left="High"
            right={<>{formatCurrency(stock.quote?.high)}</>}
          />
          <StockRow
            left="Low"
            right={<>{formatCurrency(stock.quote?.low)}</>}
          />
        </Grid>
      </CardContent>
    </Card>
  );
}
