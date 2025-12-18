import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import PasswordResetRequest from "./pages/PasswordResetRequest";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";
import AccountSettings from "./pages/AccountSettings";

import MoodPage from "./pages/MoodPage";
import ResponseAnalysisPage from "./pages/ResponseAnalysisPage";
import HistoryPage from "./pages/HistoryPage";

import ProtectedRoute from "./components/ProtectedRoute";

function AppRouterInner() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* MAIN CHAT */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />

      {/* HISTORY */}
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        }
      />

      {/* MOOD TRACKER */}
      <Route
        path="/mood"
        element={
          <ProtectedRoute>
            <MoodPage />
          </ProtectedRoute>
        }
      />

      {/* RESPONSE ANALYSIS */}
      <Route
        path="/analysis"
        element={
          <ProtectedRoute>
            <ResponseAnalysisPage />
          </ProtectedRoute>
        }
      />

      {/* USER SETTINGS */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AccountSettings />
          </ProtectedRoute>
        }
      />

      {/* AUTH PAGES */}
      <Route
        path="/login"
        element={<LoginPage onSuccess={() => navigate("/")} />}
      />

      <Route
        path="/signup"
        element={<SignupPage onSuccess={() => navigate("/login")} />}
      />

      {/* EMAIL + PASSWORD */}
      <Route path="/verify-email" element={<EmailVerifyPage />} />
      <Route path="/password-reset" element={<PasswordResetRequest />} />
      <Route
        path="/password-reset/confirm"
        element={<PasswordResetConfirm />}
      />
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
