import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { StockType } from "../Stock/Stock";

const mockOverview = {
  description:
    "Palantir Technologies Inc. creates and implements software platforms for the intelligence community in the United States to assist in counterterrorism investigations and operations. The company is headquartered in Denver, Colorado.",
  exchange: "NYSE",
  currency: "USD",
  country: "USA",
};

const mockQuote = {
  high: "10.2300",
  low: "9.1100",
  price: "10.1100",
  change: "0.8900",
  change_percent: "9.6529%",
};

const stocks: StockType[] = [
  {
    symbol: "PLTR",
    name: "Palantir Technologies Inc - Class A",
    overview: mockOverview,
    quote: mockQuote,
  },
  {
    symbol: "PTX.FRK",
    name: "Palantir Technologies Inc",
    overview: mockOverview,
    quote: { ...mockQuote, change_percent: "-5.6%" },
  },
  {
    symbol: "P2LT34.SAO",
    name: "Palantir Technologies Inc",
    overview: mockOverview,
    quote: mockQuote,
  },
  {
    symbol: "PTX.DEX",
    name: "Palantir Technologies Inc.",
    overview: mockOverview,
    quote: mockQuote,
  },
];

export type StockPickerProps = {
  setSelectedStocks: (stocks: StockType[]) => void;
  selectedStocks: StockType[];
};

export default function StockPicker({
  setSelectedStocks,
  selectedStocks,
}: StockPickerProps) {
  const [searchString, setSearchString] = useState<string>("");

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
        options={stocks.map((stock) => stock.symbol)}
        freeSolo // allow any input
        filterSelectedOptions // don't show option if already selected
        value={selectedStocks?.map((stock) => stock.symbol) || []}
        onChange={(
          event: any,
          selectedSymbols: string[],
          reason: AutocompleteChangeReason
        ) => {
          console.log("Stock selection changed", {
            reason,
            selectedSymbols,
            event,
          });
          setSelectedStocks(
            selectedSymbols.map(
              (symbol) =>
                stocks.find((stock) => stock?.symbol === symbol) as StockType
            )
          );
        }}
        inputValue={searchString}
        onInputChange={(_event, searchString) => {
          console.log('search string changed', searchString)
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
