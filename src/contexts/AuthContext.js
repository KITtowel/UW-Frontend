import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  const login = receivedToken => {
    setToken(receivedToken);
    setIsAuthenticated(true);
    if (localStorage.getItem("rememberMe") === "true") {
      localStorage.setItem("authToken", receivedToken);
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("key");
    localStorage.removeItem("rememberMe");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const rememberMe = localStorage.getItem("rememberMe");
    if (storedToken && rememberMe === "true") {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
