import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { StockType } from "../../lib/avantage";
import { stocks } from "../../mocks/mockStocks";

export type StockPickerProps = {
  setSelectedStocks: (stocks: StockType[]) => void;
  selectedStocks: StockType[];
};

const MAX_STOCK_LIMIT = 3;

export default function StockPicker({
  setSelectedStocks,
  selectedStocks,
}: StockPickerProps) {
  const [searchString, setSearchString] = useState<string>("");
  const [matchingOptions, setMatchingOptions] = useState<string[]>([]);
  const maxStocksPicked = selectedStocks.length === MAX_STOCK_LIMIT;

  // custom search for matching stock options based on user input
  useEffect(() => {
    if (!searchString) {
      setMatchingOptions([] as string[]);
      return;
    }

    const uCaseSearchString = searchString.toUpperCase();
    const selectedSymbols = selectedStocks.map((stock) => stock.symbol);

    // TODO use mocks only if mock mode enabled
    const matchingStocks = stocks
      .filter(
        (stock) =>
          stock.name.toUpperCase().includes(uCaseSearchString) ||
          stock.symbol.includes(uCaseSearchString)
      )
      .filter((stock) => !selectedSymbols.includes(stock.symbol)) // remove already selected stocks
      .map((stock) => `${stock.symbol} - ${stock.name}`);

    setMatchingOptions(matchingStocks);
  }, [searchString, selectedStocks]);

  return (
    <Container
      disableGutters
      maxWidth="md"
      component="main"
      sx={{ px: { xs: 2, sm: 3, md: 5 }, pb: { xs: 2, sm: 3, md: 5 } }}
    >
      <Autocomplete
        multiple
        id="stock-picker"
        options={matchingOptions}
        freeSolo // allow any input
        filterOptions={(x) => x} // disable built in filter so we can use our custom one
        value={selectedStocks?.map((stock) => stock.symbol) || []}
        onChange={(_event: any, selectedOptions: string[]) => {
          // update selected stock
          setSelectedStocks(
            selectedOptions.map((option) => {
              const selectedSymbol = option.split(" ")[0]; // extract the symbol from the selection
              return stocks.find(
                (stock) => stock?.symbol === selectedSymbol
              ) as StockType;
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
