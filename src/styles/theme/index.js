import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#424242",
      light: "#6d6d6d",
      dark: "#1b1b1b",
    },
    secondary: {
      main: "#1976d2",
      light: "#63a4ff",
      dark: "#004ba0",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
