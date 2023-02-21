import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { StockType } from "../../lib/avantage";
import { useSearchStocks } from "./useSearchStocks";
import { useStockSelectOptions } from "./useStockSelectOptions";

export interface StockPickerProps {
  onSelectionChanged: (stocks: StockType[]) => void;
  selectedStocks: StockType[];
  mockMode: boolean;
}

const MAX_STOCK_LIMIT = 3;

// input search box allowing the user to search for stocks.  Once selected,
// the stocks become tags at the start of the picker, which can be closed by user
export default function StockPicker({
  onSelectionChanged,
  selectedStocks,
  mockMode = false,
}: StockPickerProps) {
  const [searchString, setSearchString] = useState<string>("");

  // get a list of matching stocks based on user search input
  const { matchingStocks, searchError, searchLoading } = useSearchStocks(
    searchString,
    mockMode
  );

  // convert matching stocks to dropdown options, after filtering out already selected options
  const { matchingOptions } = useStockSelectOptions(
    selectedStocks,
    matchingStocks
  );

  const maxStocksPicked = selectedStocks.length === MAX_STOCK_LIMIT;

  return (
    <Container
      disableGutters
      maxWidth="md"
      component="main"
      sx={{ px: { xs: 2, sm: 3, md: 5 }, pb: { xs: 2, sm: 3, md: 5 } }}
    >
      {/* Tip: you can block the avantage URL in dev tools to see an error */}
      {searchError && (
        <Snackbar open={true}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {`Error looking up matching stocks. ${searchError}`}
          </Alert>
        </Snackbar>
      )}

      {/* Tip: you can throttle down connection in dev tools to keep this message on the screen longer */}
      {searchLoading && (
        <Snackbar open={true}>
          <Alert severity="info" sx={{ width: "100%" }}>
            Loading search results...
          </Alert>
        </Snackbar>
      )}

      <Autocomplete
        multiple
        id="stock-picker"
        options={matchingOptions}
        freeSolo // allow any input
        filterOptions={(x) => x} // disable built in filter so we can use our custom one
        value={selectedStocks?.map((stock) => stock.symbol) || []}
        onChange={(_event: any, selectedOptions: string[]) => {
          // update selected stocks
          onSelectionChanged(
            selectedOptions.map((option) => {
              const [symbol, name] = option.split(" - ");
              return {
                symbol,
                name,
              };
            })
          );
        }}
        inputValue={searchString}
        onInputChange={(_event, searchString) => {
          // prevent searching if max stock selections reached
          if (!maxStocksPicked) {
            setSearchString(searchString);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Stock Picker"
            placeholder={
              maxStocksPicked
                ? "Limit reached!"
                : "Pick up to 3 of your favorite stocks to compare!"
            }
          />
        )}
      />
    </Container>
  );
}
