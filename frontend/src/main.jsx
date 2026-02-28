import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppContextProvider from "./context/AppContext.jsx";
import { CartProvider } from "./context/CartContext";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
         <CartProvider>
        <App />
        </CartProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
