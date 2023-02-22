import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import reactLogo from "../../assets/react.svg";
import viteLogo from "../../assets/vite.svg";
import muiLogo from "../../assets/mui.svg";
import { IconButton, ToggleButton } from "@mui/material";
import { useMockMode } from "../../lib/MockMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useColorMode } from "../../lib/ColorMode";

// provides horizontal bar at the top, including mock mode button
export default function Header() {
  const { mockMode, toggleMockMode } = useMockMode();
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" noWrap sx={{ flexGrow: 5 }}>
          Awesome Stock App
        </Typography>
        <IconButton
          sx={{px: 2, mx: 1}}
          color="inherit"
          aria-label="Toggle Color Mode"
          onClick={() => toggleColorMode()}
        >
          {colorMode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <ToggleButton
          value="check"
          selected={mockMode}
          sx={{ flexGrow: 1 }}
          onChange={() => {
            toggleMockMode();
          }}
        >
          Mock Mode
        </ToggleButton>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="https://vitejs.dev"
            sx={{ my: 1, mx: 1.5, display: "inline" }}
          >
            Vite <img src={viteLogo} alt="Vite logo" />
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="https://reactjs.org"
            sx={{ my: 1, mx: 1.5, display: "inline" }}
            noWrap
          >
            React <img src={reactLogo} alt="React logo" />
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="https://mui.com"
            sx={{ my: 1, mx: 1.5, display: "inline" }}
            noWrap
          >
            Material UI <img src={muiLogo} alt="Material UI logo" />
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
}
