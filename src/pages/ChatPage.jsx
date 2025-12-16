import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import CharacterTransition from "../components/CharacterTransition";
import { useAuth } from "../hooks/useAuth";

export default function ChatPage() {
  const { user } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("mentalchat_theme") || "teal"
  );

  const [showLoginGate, setShowLoginGate] = useState(false);

  // Apply theme class
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  // --------------------------- LOGIN / INTRO LOGIC ----------------------------- //
  if (!user) {
    if (!showLoginGate) {
      return <CharacterTransition onFinish={() => setShowLoginGate(true)} />;
    }

    return (
      <div className="login-gate-container">
        <div className="login-gate-card">

          <h2>Welcome to LumoAI</h2>
          <p className="login-quote">
            Sign in to continue your supportive journey.
          </p>

          <div className="login-gate-buttons">
            <a href="/login" className="gate-btn primary">Login</a>
            <a href="/signup" className="gate-btn secondary">Create Account</a>
            <a href="/password-reset" className="gate-btn link">Forgot Password?</a>
          </div>

        </div>
      </div>
    );
  }

  // --------------------------- MAIN CHAT SCREEN ----------------------------- //

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar-container">
        <Sidebar setTheme={setTheme} />
      </aside>

      {/* Chat Only */}
      <main className="chat-main-content">
        <ChatWindow userId={user.username} />
      </main>
    </div>
  );
}
