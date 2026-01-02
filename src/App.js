import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FlexBenefitsPage from "./routes/FlexBenefitsPage";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("eb360_logged_in") === "true";
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <FlexBenefitsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
