import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import Stocks from "../Stocks/Stocks";
import StockPicker from "../StockPicker/StockPicker";
import { useStocks } from "./useStocks";
import { useMockMode } from "./useMockMode";

export default function App() {
  const {mockMode, onMockModeToggle} = useMockMode()
  const { selectedStocks, updateSelectedStocks, updateStock } =
    useStocks(mockMode);

  return (
    <>
      <Header mockMode={mockMode} onMockModeToggle={onMockModeToggle} />
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
