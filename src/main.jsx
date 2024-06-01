import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/app/store.js";
import "./index.css";
import "./fonts.css";
window.onerror = function(message, source, lineno, colno, error) {
  alert(`Error: ${message}\nSource: ${source}\nLine: ${lineno}, Column: ${colno}, ${error}`);
  return true;
};

window.addEventListener('unhandledrejection', function(event) {
  alert(`Unhandled rejection: ${event.reason}`);
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
