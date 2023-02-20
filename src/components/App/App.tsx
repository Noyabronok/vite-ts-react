import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import Stocks from "../Stocks/Stocks";
import StockPicker from "../StockPicker/StockPicker";
import { useState } from "react";
import { useStocks } from "./useStocks";

export default function App() {
  const [mockMode, setMockMode] = useState(false);
  const { selectedStocks, updateSelectedStocks, updateStock } =
    useStocks(mockMode);

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
        mockMode={mockMode}
      />
      <Footer />
    </>
  );
}
