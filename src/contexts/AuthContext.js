import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const rememberMe = localStorage.getItem("rememberMe");
    if (storedToken && rememberMe === "true") {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = token => {
    setToken(token);
    setIsAuthenticated(true);
    if (localStorage.getItem("rememberMe") === "true") {
      localStorage.setItem("authToken", token);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
