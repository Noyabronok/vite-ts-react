import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import CardHeader from "@mui/material/CardHeader";
import type { StockType } from "../Stock/Stock";

export default function StockHeader({ stock }: { stock: StockType }) {
  return (
    <CardHeader
      // TODO memoize the title once in the card component
      title={
        <Tooltip title={stock.overview?.description}>
          <span>{stock.name}</span>
        </Tooltip>
      }
      subheader={stock.symbol}
      titleTypographyProps={{ align: "center" }}
      action={
        <IconButton
          onClick={(e) => console.log("Clicked card close", e.target)}
        >
          <CloseIcon />
        </IconButton>
      }
      subheaderTypographyProps={{
        align: "center",
      }}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    />
  );
}
