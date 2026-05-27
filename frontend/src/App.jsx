import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import AdminPanel from "./pages/AdminPanel"; 
import Chatbot from "./components/Chatbot";
import Footer from "./components/common/Footer";
import { ToastProvider } from "./context/ToastContext";
import { ChatSocketProvider } from "./context/ChatSocketContext";

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return (
      <div className="loader-container">
        <div className="pulse-loader">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
        <p className="loader-text">Loading EcomCatalog session...</p>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      {/* Navbar visible only when logged in */}
      {isAuthenticated && <Navbar onSearchChange={setSearchQuery} />}

      <main className="main-content">
        <Routes>
          {/* Default entry point: Open /login by default */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
            }
          />
          
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <LoginPage />
            }
          />
          
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <RegisterPage />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage searchQuery={searchQuery} />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* Wildcard Fallback */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
          />
        </Routes>
      </main>

      {isAuthenticated && <Chatbot />}

      {isAuthenticated && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <ChatSocketProvider>
              <AppContent />
            </ChatSocketProvider>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;