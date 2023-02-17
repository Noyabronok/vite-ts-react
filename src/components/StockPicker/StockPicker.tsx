import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { StockType } from "../Stock/Stock";
import { stocks } from "../../mocks/mockStocks";

export type StockPickerProps = {
  setSelectedStocks: (stocks: StockType[]) => void;
  selectedStocks: StockType[];
};

export default function StockPicker({
  setSelectedStocks,
  selectedStocks,
}: StockPickerProps) {
  const [searchString, setSearchString] = useState<string>("");
  const [matchingOptions, setMatchingOptions] = useState<string[]>([]);

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
        filterOptions={(x) => x}
        value={selectedStocks?.map((stock) => stock.symbol) || []}
        onChange={(_event: any, selectedOptions: string[]) => {
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
          setSearchString(searchString);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Stock Picker"
            placeholder="Pick up to 3 of your favorite stocks to compare!"
          />
        )}
      />
    </Container>
  );
}
