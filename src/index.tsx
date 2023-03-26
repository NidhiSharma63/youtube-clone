import { BrowserRouter } from "react-router-dom";
import App from "App";
import { createRoot } from "react-dom/client";
import "style/index.css";
import theme from "theme/muiTheme";
import { ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchProvider from "context/SearchProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SavedVideoProvider from "context/SavedVideoProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const element = (
  <>
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <SavedVideoProvider>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                closeButton={true}
              />
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </SavedVideoProvider>
      </SearchProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </>
);

const elementHtml = document.getElementById("root");
const root = createRoot(elementHtml!);

root.render(element);
