import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import { stockSearch, StockType } from "../../lib/avantage";
import { stocks } from "../../mocks/mockStocks";

export type StockPickerProps = {
  setSelectedStocks: (stocks: StockType[]) => void;
  selectedStocks: StockType[];
  isMockMode: boolean;
};

const MAX_STOCK_LIMIT = 3;

export default function StockPicker({
  setSelectedStocks,
  selectedStocks,
  isMockMode = false,
}: StockPickerProps) {
  const [searchString, setSearchString] = useState<string>("");
  const [matchingStocks, setMatchingStocks] = useState<StockType[]>([]); // raw results from search
  const [matchingOptions, setMatchingOptions] = useState<string[]>([]); // unselected and option mapped result
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const maxStocksPicked = selectedStocks.length === MAX_STOCK_LIMIT;

  // search for matching stock options based on user input
  useEffect(() => {
    // nothing to search for, clear results if we had any
    if (!searchString) {
      setMatchingStocks([]);
      return;
    }

    if (isMockMode) {
      const uCaseSearchString = searchString.toUpperCase();

      const matchingStocks = stocks.filter(
        (stock) =>
          stock.name.toUpperCase().includes(uCaseSearchString) ||
          stock.symbol.includes(uCaseSearchString)
      );

      setMatchingStocks(matchingStocks);
      setLoading(false);
    } else {
      // TODO add debouncing
      const controller = new AbortController();
      const { signal } = controller;

      const fetchData = async () => {
        setError(false);
        setLoading(true);

        try {
          let matchingStocks = await stockSearch(searchString, signal);
          setMatchingStocks(matchingStocks);
        } catch (error) {
          setError(true);
        }
        setLoading(false);
      };

      fetchData();

      return () => controller.abort();
    }
  }, [searchString, selectedStocks, isMockMode]);

  // Update selection if we receive results from search or stock selection updated by user
  // 1. remove already selected stocksmap discovered stocks to selectOptions
  // 2. map to and update selection options
  // Important: we don't want this defined inside useEffect's async
  //            in order to avoid stale selectedSymbols closure
  useEffect(() => {
    const selectedSymbols = selectedStocks.map((stock) => stock.symbol);

    const unselectedMatchingStocks = matchingStocks.filter(
      (stock) => !selectedSymbols.includes(stock.symbol)
    ); // remove already selected stocks

    const matchingStockOptions = unselectedMatchingStocks.map(
      (stock) => `${stock.symbol} - ${stock.name}`
    );
    setMatchingOptions(matchingStockOptions);
  }, [matchingStocks, selectedStocks]);

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
