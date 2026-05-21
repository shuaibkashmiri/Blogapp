import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token") || null,
    userId: localStorage.getItem("userId") || null,
    email: localStorage.getItem("email") || null,
  });

  const login = ({ token, userId, email }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", email);
    setAuthState({ token, userId, email });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    setAuthState({ token: null, userId: null, email: null });
  };

  const isAuthenticated = Boolean(authState.token);

  return (
    <AuthContext.Provider
      value={{ ...authState, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
