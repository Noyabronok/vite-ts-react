import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import Stocks from "../Stocks/Stocks";
import StockPicker from "../StockPicker/StockPicker";
import type { StockType } from "../../lib/avantage";
import { useState } from "react";

export default function App() {
  const [stocks, setStocks] = useState<StockType[]>([]);

  const setSelectedStocks = (stocks: StockType[]) => {
    setStocks(stocks);
  };

  return (
    <>
      <Header />
      <Hero />
      <StockPicker
        setSelectedStocks={setSelectedStocks}
        selectedStocks={stocks}
      />
      <Stocks stocks={stocks} />
      <Footer />
    </>
  );
}
