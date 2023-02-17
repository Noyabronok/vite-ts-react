// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import CardHeader from "@mui/material/CardHeader";
import type { StockType } from "../../lib/avantage";

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
      // TODO: consider removing this since there's already an option to remove the stocks in the picker
      // action={
      //   <IconButton
      //     onClick={(e) => console.log("Clicked card close", e.target)}
      //   >
      //     <CloseIcon />
      //   </IconButton>
      // }
      subheaderTypographyProps={{
        align: "center",
      }}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    />
  );
}
