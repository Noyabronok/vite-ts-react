import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";
import { StockSelectionProvider } from "./lib/StockSelection";
import { MockModeProvider } from "./lib/MockMode";
import { StockSearchProvider } from "./lib/StockSearch";

// NOTE: React.StrictMode renders components twice in development to expose bugs
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <BrowserRouter>
        <MockModeProvider>
          <StockSelectionProvider>
            <StockSearchProvider>{<App />}</StockSearchProvider>
          </StockSelectionProvider>
        </MockModeProvider>
      </BrowserRouter>
  </React.StrictMode>
);
