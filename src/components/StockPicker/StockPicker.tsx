import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { stockSearch, StockType } from "../../lib/avantage";
import { mockStocks } from "../../mocks/mockStocks";

export interface StockPickerProps {
  onSelectionChanged: (stocks: StockType[]) => void;
  selectedStocks: StockType[];
  mockMode: boolean;
}

const MAX_STOCK_LIMIT = 3;
const DEBOUNCE_TIMEOUT = 400;

export default function StockPicker({
  onSelectionChanged,
  selectedStocks,
  mockMode = false,
}: StockPickerProps) {
  const [searchString, setSearchString] = useState<string>("");
  const [matchingStocks, setMatchingStocks] = useState<StockType[]>([]); // raw results from search
  const [matchingOptions, setMatchingOptions] = useState<string[]>([]); // unselected and option mapped result
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<Error | null>(null);

  const maxStocksPicked = selectedStocks.length === MAX_STOCK_LIMIT;

  // clear selections on mockMode toggle
  useEffect(() => {
    onSelectionChanged([]);
  }, [mockMode]);

  // search for matching stock options based on user input
  useEffect(() => {
    // nothing to search for, clear results if we had any
    if (!searchString) {
      setMatchingStocks([]);
      return;
    }

    if (mockMode) {
      setSearchLoading(true);
      setSearchError(null);

      try {
        const uCaseSearchString = searchString.toUpperCase();

        const matchingStocks = mockStocks.filter(
          (stock) =>
            stock.name.toUpperCase().includes(uCaseSearchString) ||
            stock.symbol.includes(uCaseSearchString)
        );
        setMatchingStocks(matchingStocks);
      } catch (error) {
        setSearchError(error as Error);
      } finally {
        setSearchLoading(false);
      }
    } else {
      const controller = new AbortController();
      const { signal } = controller;

      const fetchData = async () => {
        setSearchError(null);
        setSearchLoading(true);

        try {
          let matchingStocks = await stockSearch(searchString, signal);
          setMatchingStocks(matchingStocks);
        } catch (error) {
          setSearchError(error as Error);
        } finally {
          setSearchLoading(false);
        }
      };

      // use timeout to debounce search requests
      const searchRequest = setTimeout(() => {
        fetchData();
      }, DEBOUNCE_TIMEOUT);

      // cleanup
      return () => {
        clearTimeout(searchRequest);
        controller.abort();
        setSearchLoading(false);
      };
    }
  }, [searchString, selectedStocks, mockMode]);

  // Update matching options if we receive new search results or stock selection updated by user
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
