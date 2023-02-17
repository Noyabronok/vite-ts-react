
export type FetchOperation = 'SEARCH' | 'OVERVIEW' | 'QUOTE'

const URL_BASE = 'https://www.alphavantage.co/query?function=';
const API_KEY = '&apikey=ZKNJ4ST22E17NFP2'; // this is a "public" demo key, so OK to expose

export const avantageFetch = async (operation: FetchOperation, input: string) => {
  let url = URL_BASE;

  if (operation === "SEARCH") {
    url += 'SYMBOL_SEARCH&keywords=' + input + API_KEY;
  } else if (operation === "OVERVIEW") {
    url += 'OVERVIEW&symbol=' + input + API_KEY;
  } else if (operation === "QUOTE") {
    url += 'GLOBAL_QUOTE&symbol=' + input + API_KEY;
  } else {
    throw new Error('avantage client - unsupported operation');
  }

  // generate the abort signal here that consumer can use to abort the fetch
  const abortController = new AbortController();
  const signal = abortController.signal;

  const fetchPromise = fetch(url, { signal })
  .then((response) => {
    console.log("Download complete", response);
  })
  .catch((err) => {
    console.error(`Download error: ${err.message}`);
  });

  return {
    abortController,
    fetchPromise,
  }
}
