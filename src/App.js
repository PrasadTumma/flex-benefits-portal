import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FlexBenefitsPage from "./routes/FlexBenefitsPage";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <BrowserRouter>
  <Routes>

    {/* Login */}
    <Route path="/" element={<LoginPage />} />

    {/* Protected Dashboard */}
    <Route
      path="/dashboard"
      element={
        isLoggedIn ? <FlexBenefitsPage /> : <Navigate to="/" />
      }
    />

    {/* Fallback */}
    <Route path="*" element={<Navigate to="/" />} />

  </Routes>
</BrowserRouter>

  );
};

export default App;
