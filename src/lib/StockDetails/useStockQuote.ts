import useSWR from 'swr'
import { stockQuote, StockQuote } from '../avantage';
import { useMockMode } from '../MockMode';

export function useStockQuote (stockSymbol: string) {
  const controller = new AbortController();
  const signal = controller.signal;
  const {mockMode} = useMockMode();
  
  const { data, error, isLoading } = useSWR<StockQuote>(`/stock/quote/${stockSymbol}`, () => {
    return stockQuote(stockSymbol, signal, mockMode)
  })

  return {
    quote: data,
    isLoading,
    isError: error,
    abortControl: controller,
  }
}