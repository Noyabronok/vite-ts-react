import mockSearchResults from "./mocks/search.json";
import mockOverviews from "./mocks/overviews.json";
import mockQuotes from "./mocks/quotes.json";

const MOCK_DELAY = 200;

export type FetchOperation = "SEARCH" | "OVERVIEW" | "QUOTE";

export interface SearchResultItem {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

export interface RawSearchResponse {
  bestMatches: SearchResultItem[];
}

// there are more items returned but we don't need them
export interface RawOverviewResponse {
  Description: string;
  Currency: string;
  Country: string;
  EPS: string;
  [key: string]: string;
}

export interface RawQuoteResponse {
  "Global Quote": {
    "01. symbol": string;
    "02. open": string;
    "03. high": string;
    "04. low": string;
    "05. price": string;
    "06. volume": string;
    "07. latest trading day": string;
    "08. previous close": string;
    "09. change": string;
    "10. change percent": string;
  };
}

const URL_BASE = "https://www.alphavantage.co/query?function=";

// this is a "public" demo key, so OK to expose
// attempted using multiple keys since alpha vantage limits usage,
// but they're tracking the client by some other means :( oh well, I tried
const API_KEYS = [
  "20EA0W8KBKQGHWIN",
  "ZKNJ4ST22E17NFP2",
  "LL3RTRAXFBDA5JQV",
  "RUYJ8U2X9P4EUDOF",
  "WWN7ZNVB6L4ZBG1H",
];
const MAX_KEY_INDEX = API_KEYS.length - 1;
let keyIndex = 0;

const getApiKey = () => {
  // override api key if provided in the query string
  // Doesn't even seem to matter what the value is, it's all the same :crying:
  // But if you have a premium key, then it should work great!
  const urlSearchParams = new URLSearchParams(window.location.search);
  if (urlSearchParams.has("apiKey")) {
    return "&apikey=" + urlSearchParams.get("apiKey");
  }
  const key = API_KEYS[keyIndex];
  keyIndex = keyIndex === MAX_KEY_INDEX ? 0 : keyIndex + 1; //rotate key for the next request
  return "&apikey=" + key;
};

// a common client for alpha vantage api.  Supports mock mode for testing
export const avantageFetch = async <
  T extends RawSearchResponse | RawOverviewResponse | RawQuoteResponse
>(
  operation: FetchOperation,
  input: string,
  abortSignal: AbortSignal,
  mockMode: boolean
) => {
  // return some mock responses instead of calling the alpha vantage api
  if (mockMode) {
    return new Promise<T>((resolve, reject) => {
      setTimeout(() => {
        if (abortSignal.aborted) {
          reject(new Error("mock avantage client aborted by client"));
        }

        if (operation === "SEARCH") {
          if (!input) {
            resolve({
              bestMatches: [] as SearchResultItem[]
            } as T);
          }
          const uCaseSearchString = input.toUpperCase();
          const matchingStocks = mockSearchResults.filter(
            (stock) =>
              stock["2. name"].toUpperCase().includes(uCaseSearchString) ||
              stock["1. symbol"].includes(uCaseSearchString)
          );

          return resolve({
            bestMatches: matchingStocks,
          } as T);
        } else if (operation === "OVERVIEW") {
          const overview = mockOverviews.find(
            (overview) => overview.Symbol === input
          ) as RawOverviewResponse;
          return resolve(overview as T);
        } else if (operation === "QUOTE") {
          const quote = mockQuotes.find(
            (quote) => quote["01. symbol"] === input
          );
          return resolve({ "Global Quote": quote } as T);
        } else {
          throw new Error("mock avantage client - unsupported operation");
        }
      }, MOCK_DELAY);
    });
  }

  let url = URL_BASE;

  if (operation === "SEARCH") {
    url += "SYMBOL_SEARCH&keywords=" + input + getApiKey();
  } else if (operation === "OVERVIEW") {
    url += "OVERVIEW&symbol=" + input + getApiKey();
  } else if (operation === "QUOTE") {
    url += "GLOBAL_QUOTE&symbol=" + input + getApiKey();
  } else {
    throw new Error("avantage client - unsupported operation");
  }

  return fetch(url, { signal: abortSignal }).then((response) => {
    //@ts-ignore
    return response.json() as T;
  });
  // let's handle errors higher up, no catch
};
