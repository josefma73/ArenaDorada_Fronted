import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider
      options={{
        clientId:
          "AWDIsE5mBLJrDEAPLe2tNDCZs3U-z5eKu3Hl1HYNg_hNRpChg13uVTQGcvA9JkU7vPV6GjnOII5Jr9kX",
        currency: "USD",
        intent: "capture",
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PayPalScriptProvider>
  </React.StrictMode>
);
