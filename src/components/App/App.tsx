import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import Stocks from "../Stocks/Stocks";
import StockPicker from "../StockPicker/StockPicker";
import { ColorModeProvider } from "../../lib/ColorMode";
import CssBaseline from "@mui/material/CssBaseline";

// page layout for our application
export default function App() {
  return (
    <ColorModeProvider>
      <Header />
      <Hero />
      <StockPicker />
      <Stocks />
      <Footer />
    </ColorModeProvider>
  );
}
