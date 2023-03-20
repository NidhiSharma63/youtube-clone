import { BrowserRouter } from "react-router-dom";
import App from "App";
import { createRoot } from "react-dom/client";
import "style/index.css";
import theme from "theme/muiTheme";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import SearchProvider from "context/SearchProvider";

const queryClient = new QueryClient();

const element = (
  <QueryClientProvider client={queryClient}>
    <SearchProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </SearchProvider>
  </QueryClientProvider>
);

const elementHtml = document.getElementById("root");
const root = createRoot(elementHtml!);

root.render(element);
