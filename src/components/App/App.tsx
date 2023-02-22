import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import Stocks from "../Stocks/Stocks";
import StockPicker from "../StockPicker/StockPicker";

// page layout for our application
export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <StockPicker />
      <Stocks />
      <Footer />
    </>
  );
}
