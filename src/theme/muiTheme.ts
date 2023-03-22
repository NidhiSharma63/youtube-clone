import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // main: "#0b0c12",
      main: "#0F0F0F",
    },

    secondary: {
      dark: "#606661",
      main: "#fff",
    },
    info: {
      main: "#282829",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 850,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
