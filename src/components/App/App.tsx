import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import Stocks from "../Stocks/Stocks";
import StockPicker from "../StockPicker/StockPicker";
import type { StockType } from "../../lib/avantage";
import { useState } from "react";

export default function App() {
  const [mockMode, setMockMode] = useState(false);
  const [stocks, setStocks] = useState<StockType[]>([]);

  const updateSelectedStocks = (stocks: StockType[]) => {
    setStocks(stocks);
  };

  const toggleMockMode = (newMockMode: boolean) => setMockMode(newMockMode);

  return (
    <>
      <Header mockMode={mockMode} onMockModeToggle={toggleMockMode} />
      <Hero />
      <StockPicker
        onSelectionChanged={updateSelectedStocks}
        selectedStocks={stocks}
        isMockMode={mockMode}
      />
      <Stocks stocks={stocks} />
      <Footer />
    </>
  );
}
