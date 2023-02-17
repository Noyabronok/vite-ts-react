import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import Stocks from "../Stocks/Stocks";
import StockPicker from "../StockPicker/StockPicker";
import type { StockType } from "../../lib/avantage";
import { useState } from "react";
import { mockStocks } from "../../mocks/mockStocks";

export default function App() {
  const [mockMode, setMockMode] = useState(false);
  const [selectedStocks, setSelectedStocks] = useState<StockType[]>([]);

  const updateSelectedStocks = (updatedStocks: StockType[]) => {
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

        // TODO need to trigger getting the rest of data 
        return updatedStock;
      });

      setSelectedStocks(newlySelectedStocks);
    }
  };

  const toggleMockMode = (newMockMode: boolean) => setMockMode(newMockMode);

  return (
    <>
      <Header mockMode={mockMode} onMockModeToggle={toggleMockMode} />
      <Hero />
      <StockPicker
        onSelectionChanged={updateSelectedStocks}
        selectedStocks={selectedStocks}
        isMockMode={mockMode}
      />
      <Stocks stocks={selectedStocks} />
      <Footer />
    </>
  );
}
