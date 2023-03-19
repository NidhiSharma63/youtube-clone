import { BrowserRouter } from "react-router-dom";
import App from "App";
import { createRoot } from "react-dom/client";
import "style/index.css";
import theme from "theme/muiTheme";
import { ThemeProvider } from "@mui/material";

const element = (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

const elementHtml = document.getElementById("root");
const root = createRoot(elementHtml!);

root.render(element);
