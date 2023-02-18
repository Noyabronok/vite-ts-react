import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./components/App/App";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#5893df',
    },
    secondary: {
      main: '#2ec5d3',
    },
    background: {
      default: '#192231',
      paper: '#24344d',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 660, // give a little more width
      md: 980,
      lg: 1200,
      xl: 1536,
    },
  },
});

// NOTE: React.StrictMode renders components twice in development to expose bugs
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode> 
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {<App />}
    </ThemeProvider>
  </React.StrictMode>
);
