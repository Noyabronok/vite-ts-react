import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import Stocks from "../Stocks/Stocks";
import StockPicker from "../StockPicker/StockPicker";
import type { StockType } from "../../lib/avantage";
import { useCallback, useEffect, useState } from "react";
import { mockStocks } from "../../mocks/mockStocks";

export default function App() {
  const [mockMode, setMockMode] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState<StockType[]>([]);

  // clear selections on mockMode toggle
  useEffect(() => {
    setSelectedStocks([]);
  }, [mockMode]);

  const updateSelectedStocks = useCallback(
    (updatedStocks: StockType[]) => {
      if (mockMode) {
        // map the selected stocks to full info mock stocks
        const newlySelectedStocks = updatedStocks.map(
          (stock) =>
            mockStocks.find(
              (mockStock) => mockStock.symbol === stock.symbol
            ) as StockType
        );
        setSelectedStocks(newlySelectedStocks);
      } else {
        const newlySelectedStocks = updatedStocks.map((updatedStock) => {
          const alreadySelectedStock = selectedStocks.find(
            (selectedStock) => selectedStock.symbol === updatedStock.symbol
          );
          if (alreadySelectedStock) {
            return alreadySelectedStock;
          }
          return updatedStock;
        });

        setSelectedStocks(newlySelectedStocks);
      }
    },
    [mockMode, selectedStocks]
  );

  // handle fetch results for stock details from the stock component
  const updateStock = useCallback((updatedStock: StockType) => {
    const updatedStocks = selectedStocks.map((stock) =>
      stock.symbol === updatedStock.symbol ? updatedStock : stock
    );
    setSelectedStocks(updatedStocks);
  }, [selectedStocks]);

  const toggleMockMode = (newMockMode: boolean) => setMockMode(newMockMode);

  return (
    <>
      <Header mockMode={mockMode} onMockModeToggle={toggleMockMode} />
      <Hero />
      <StockPicker
        onSelectionChanged={updateSelectedStocks}
        selectedStocks={selectedStocks}
        mockMode={mockMode}
      />
      <Stocks
        stocks={selectedStocks}
        onStockUpdated={updateStock}
      />
      <Footer />
    </>
  );
}
