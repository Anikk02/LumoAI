import React, { createContext, useContext, useState } from "react";
import {
  login,
  signup,
  verifyEmail,
  confirm2FAVerify,
} from "../api/apiClient";

const AuthContext = createContext();

const ACCESS_KEY = "mentalchat_token";
const REFRESH_KEY = "mentalchat_refresh";
const USER_KEY = "mc_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
  });

  const [pending2FAUser, setPending2FAUser] = useState(null);

  // ----------------------------------------
  // Save / Remove User in localStorage
  // ----------------------------------------
  function storeUser(u) {
    if (!u) localStorage.removeItem(USER_KEY);
    else localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
  }

  // ----------------------------------------
  // SIGNUP (clean error handling)
  // ----------------------------------------
  async function handleSignup({ username, email, password }) {
    try {
      const r = await signup({ username, email, password });
      return { ok: true, data: r.data };
    } catch (err) {
      let msg = "Signup failed";

      if (err.response?.data?.detail) {
        const d = err.response.data.detail;

        if (Array.isArray(d)) {
          msg = d[0]?.msg || msg;
        } else if (typeof d === "string") {
          msg = d;
        }
      }

      return { error: msg };
    }
  }

  // ----------------------------------------
  // LOGIN + Handle 2FA
  // ----------------------------------------
  async function handleLogin(username, password) {
    try {
    const res = await login(username, password);

    const { access_token, refresh_token, user } = res.data;

    localStorage.setItem(ACCESS_KEY, access_token);
    localStorage.setItem(REFRESH_KEY, refresh_token);

    // ✅ STORE FULL USER (THIS FIXES EVERYTHING)
    storeUser(user);

    return { ok: true };
  } catch (err) {
    if (err.twoFactorRequired) {
      setPending2FAUser(username);
      return { twoFactor: true };
    }

    let msg = err.response?.data?.detail || "Login failed";
    return { error: msg };
  }
}


  // ----------------------------------------
  // VERIFY 2FA CODE
  // ----------------------------------------
  async function verify2FA({ otp_code, otp_code_secret }) {
  try {
    const r = await confirm2FAVerify({
      username: pending2FAUser,
      otp_code,
      otp_code_secret: otp_code_secret ?? null,  
    });

    setPending2FAUser(null);
    return { ok: true };
  } catch (e) {
    return { error: "Invalid OTP" };
  }
}



  // ----------------------------------------
  // EMAIL VERIFICATION
  // ----------------------------------------
  async function handleVerifyEmail(token, uid) {
    try {
      const r = await verifyEmail(token, uid);
      return r.data;
    } catch (e) {
      return { error: "Invalid or expired verification link" };
    }
  }

  // ----------------------------------------
  // LOGOUT
  // ----------------------------------------
  function logout() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    storeUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        pending2FAUser,
        login: handleLogin,
        signup: handleSignup,
        verify2FA,
        verifyEmail: handleVerifyEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
