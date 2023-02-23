import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export type ColorMode = "light" | "dark";

export interface ColorModeType {
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeType | undefined>(undefined);

const breakpoints = {
  values: {
    xs: 0,
    sm: 660, // give a little more width
    md: 980,
    lg: 1200,
    xl: 1536,
  }
}

export function ColorModeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>("dark");

  const { toggleColorMode } = useMemo(
    () => ({
      toggleColorMode: () => {
        setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const darkMode = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#5893df",
          },
          secondary: {
            main: "#2ec5d3",
          },
          background: {
            default: "#192231",
            paper: "#24344d",
          },
        },
        breakpoints,
      }),
    []
  );

  
  const lightMode = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
        },
        breakpoints,
      }),
    []
  );

  const theme = colorMode === "dark" ? darkMode : lightMode
  
  const value = {
    colorMode,
    toggleColorMode,
  };

  return (
    <ColorModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export function useColorMode() {
  const context = useContext(ColorModeContext);

  if (context === undefined) {
    throw new Error(
      "useColorModeContext must be used within a ColorModeContextProvider"
    );
  }
  return context;
}
