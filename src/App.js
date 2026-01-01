import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FlexBenefitsPage from "./routes/FlexBenefitsPage";

const App = () => {
  const isLoggedIn = localStorage.getItem("eb360_logged_in") === "true";

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <FlexBenefitsPage /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
