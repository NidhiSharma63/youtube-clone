import { BrowserRouter } from "react-router-dom";
import App from "App";
import { createRoot } from "react-dom/client";

const element = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const elementHtml = document.getElementById("root");
const root = createRoot(elementHtml!);

root.render(element);
