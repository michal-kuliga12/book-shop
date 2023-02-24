import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { UserContextProvider } from "./context/userContext.js";
import { SearchContextProvider } from "./context/searchContext.js";

axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <SearchContextProvider>
        <App />
      </SearchContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
