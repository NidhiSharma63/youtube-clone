import { BrowserRouter } from "react-router-dom";
import App from "App";
import { createRoot } from "react-dom/client";
import "style/index.css";
import theme from "theme/muiTheme";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import SearchProvider from "context/SearchProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>
);

const elementHtml = document.getElementById("root");
const root = createRoot(elementHtml!);

root.render(element);
