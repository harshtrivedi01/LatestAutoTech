"use client"; // ✅ Ensure it runs on the client side

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null); // ✅ Ensure default value is null

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ✅ Check authentication state on mount
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider"); // ✅ Prevents undefined context errors
  }
  return context;
}
