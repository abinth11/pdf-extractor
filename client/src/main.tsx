import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./featrues/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./pages/error/ErrorBoundary.tsx";
import FallbackUI from "./components/error/FallBackUi.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary
          fallbackUI={<FallbackUI />}
          children={<App />}
        ></ErrorBoundary>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
