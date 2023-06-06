import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? true : false);
  const [token, setToken] = useState(null);

  const login = receivedToken => {
    setToken(receivedToken);
    setIsAuthenticated(true);
    if (localStorage.getItem("rememberMe") === "true") {
      localStorage.setItem("token", receivedToken);
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("rememberMe"); // 로그아웃 시 rememberMe도 함께 제거
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
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
