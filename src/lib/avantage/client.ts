
export type FetchOperation = 'SEARCH' | 'OVERVIEW' | 'QUOTE'

const URL_BASE = 'https://www.alphavantage.co/query?function=';
const API_KEY = '&apikey=ZKNJ4ST22E17NFP2'; // this is a "public" demo key, so OK to expose

export const avantageFetch = async <T>(operation: FetchOperation, input: string, abortSignal: AbortSignal) => {
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

  return fetch(url, { signal: abortSignal })
  .then((response) => {
    return response.json() as T;
  })
  .catch((err) => {
    console.error(`Avantage fetch error: ${err.message}`);
    throw new Error(`avantage client - fetch error - ${err.message}`)
  });
}
