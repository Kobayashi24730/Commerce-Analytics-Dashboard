import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import MenuLaterral from "./components/layout/MenuLaterral";
import Dashboard from "./pages/deshboard";
import Revenue from "./pages/Revenue";
import Funnel from "./pages/Funnel";
import Customers from "./pages/Customers";
import Finance from "./pages/Finance";

import "./styles/global.css";

const queryClient = new QueryClient();

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erro de renderizacao no front:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "#f3f4f6",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "720px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "20px",
              boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
              padding: "28px",
            }}
          >
            <h1 style={{ marginBottom: "12px", color: "#111827" }}>
              O front encontrou um erro
            </h1>
            <p style={{ color: "#4b5563", marginBottom: "16px" }}>
              A tela nao ficou branca por completo porque esta barreira segurou o erro.
              Abra o console para ver o detalhe tecnico.
            </p>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                background: "#f9fafb",
                borderRadius: "12px",
                padding: "16px",
                color: "#991b1b",
                fontSize: "13px",
              }}
            >
              {String(this.state.error?.message || this.state.error || "Erro desconhecido")}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="app">
            <MenuLaterral />

            <main className="conteudo">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/revenue" element={<Revenue />} />
                <Route path="/funnel" element={<Funnel />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/finance" element={<Finance />} />
              </Routes>
            </main>
          </div>
        </Router>
      </QueryClientProvider>
    </AppErrorBoundary>
  </React.StrictMode>
);
