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
          <span>{stock.symbol}</span>
        </Tooltip>
      }
      subheader={stock.name}
      titleTypographyProps={{ align: "center", variant: 'h6' }}
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
