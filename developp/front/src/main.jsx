// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import ChakraProviderWrapper from "./ChakraProviderWrapper";
import { AuthProvider } from "./components/context/AuthContext";
import { PopupProvider } from "./components/context/PopupContext"; // Contexte de popup
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Création d'un client React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProviderWrapper>
      <Router>
        <AuthProvider>
          <PopupProvider>
            <QueryClientProvider client={queryClient}>
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </PopupProvider>
        </AuthProvider>
      </Router>
    </ChakraProviderWrapper>
  </React.StrictMode>,
);