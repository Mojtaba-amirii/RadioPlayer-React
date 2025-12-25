import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./styles/index.css";
import Header from "./components/Header";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>
);
