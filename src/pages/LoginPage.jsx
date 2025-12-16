import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import TwoFAPage from "./TwoFAPage";

export default function LoginPage({ onSuccess }) {
  const { login, pending2FAUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("login");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");

    const result = await login(username, password);

    if (result.twoFactor) {
      setStep("2fa");
      return;
    }

    if (result.error) {
      setError(result.error);
      return;
    }

    // 🔥 FIX — Avoid crash if parent didn't pass this prop
    if (onSuccess && typeof onSuccess === "function") {
      onSuccess();
    }
  }

  if (step === "2fa") return <TwoFAPage onSuccess={onSuccess} />;

  return (
    <div className="auth-wrapper">
      <div className="auth-card animated">
        <h2>Welcome Back</h2>
        <p className="subtext">We're glad you're here 💚</p>

        <form onSubmit={submit} className="auth-form">
          <input
            placeholder="Username"
            className="auth-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn">Login</button>
        </form>

        {error && <div className="error-msg">{error}</div>}

        <div className="auth-links">
          <a href="/password-reset">Forgot Password?</a> |
          <a href="/signup"> Create Account</a>
        </div>
      </div>
    </div>
  );
}
