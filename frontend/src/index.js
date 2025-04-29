import React from "react";
import ReactDOM from "react-dom/client"; // Notice the import from 'react-dom/client'
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // Ensure BrowserRouter is wrapping your app

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);