import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./landing_page/home/HomePage";
import Login from "./landing_page/login/Login";
import Signup from "./landing_page/signup/Signup";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import NotFound from "./landing_page/NotFound";
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";

import KiteHome from "./dashboard/Home";

// Layout wrapper for public marketing & authentication pages
const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 140px)" }}>{children}</main>
      <Footer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Pages */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <HomePage />
                </PublicLayout>
              }
            />
            <Route
              path="/login"
              element={
                <PublicLayout>
                  <Login />
                </PublicLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicLayout>
                  <Signup />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <AboutPage />
                </PublicLayout>
              }
            />
            <Route
              path="/product"
              element={
                <PublicLayout>
                  <ProductPage />
                </PublicLayout>
              }
            />
            <Route
              path="/pricing"
              element={
                <PublicLayout>
                  <PricingPage />
                </PublicLayout>
              }
            />
            <Route
              path="/support"
              element={
                <PublicLayout>
                  <SupportPage />
                </PublicLayout>
              }
            />

            {/* Protected Kite Trading Terminal */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <KiteHome />
                </ProtectedRoute>
              }
            />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <PublicLayout>
                  <NotFound />
                </PublicLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
