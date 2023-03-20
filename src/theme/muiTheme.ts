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
      main: "#9c9a9a",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
