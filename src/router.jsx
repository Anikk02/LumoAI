import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";
import AccountSettings from "./pages/AccountSettings";

// NEW PAGES
import MoodPage from "./pages/MoodPage";
import ResponseAnalysisPage from "./pages/ResponseAnalysisPage";
import HistoryPage from "./pages/HistoryPage";
import ProtectedRoute from "./components/ProtectedRoute";


function AppRouterInner() {
  const navigate = useNavigate();

  return (
    <Routes>

      {/* MAIN CHAT */}
      <Route path="/" element={<ChatPage />} />

      {/*HISTORY PAGE */}
      <Route path="/history" element={<HistoryPage />} />

      {/* MOOD TRACKER */}
      <Route path="/mood" element={<MoodPage />} />

      {/* RESPONSE ANALYSIS */}
      <Route path="/analysis" element={<ResponseAnalysisPage />} />

      {/* AUTH PAGES */}
      <Route
        path="/login"
        element={
          <LoginPage onSuccess={() => navigate("/")} />
        }
      />

      <Route
        path="/signup"
        element={
          <SignupPage onSuccess={() => navigate("/login")} />
        }
      />

      {/* EMAIL + PASSWORD */}
      <Route path="/verify-email" element={<EmailVerifyPage />} />
      <Route path="/password-reset" element={<PasswordResetRequest />} />
      <Route path="/password-reset/confirm" element={<PasswordResetConfirm />} />

      {/* USER SETTINGS */}
      <Route path="/settings" element={<AccountSettings />} />

    </Routes>
  );
}

export default function AppRouter() {
  return (
    <Router>
      <AppRouterInner />
    </Router>
  );
}
