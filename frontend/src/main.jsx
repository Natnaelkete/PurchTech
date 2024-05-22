import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import store from "./Store";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "570040375385-a2l136ohdir0ug5o9v65bk273549ntnv.apps.googleusercontent.com";
// console.log(clientId);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <HelmetProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
            <ToastContainer position="top-center" className="z-50" />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Provider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
