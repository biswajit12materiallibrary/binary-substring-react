import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";

// Define the AuthContext type
interface AuthContextType {
  isAuthenticated: boolean;
  loginTrue: () => void;
  logout: () => void;
}

// Define the type for AuthProvider props, including children
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to access authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component to provide context
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginTrue = () => {
    setIsAuthenticated(true);
    navigate("/selection"); // Redirect to selection page after login
  };

  const logout = () => {
    setIsAuthenticated(false);
    removeToken();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginTrue, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
