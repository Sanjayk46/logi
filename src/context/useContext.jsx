import React, { createContext, useContext, useState, useEffect } from "react";
import AxiosService from "../AxiosService";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login Function
  const login = async (email, password) => {
    try {
      const { data } = await AxiosService.post("/user/login", { email, password });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed!");
    }
  };

  // Register Function
  const register = async (name, email, password) => {
    try {
      const { data } = await AxiosService.post("/user/register", { name, email, password });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // Store user in localStorage
      toast.success("Register successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed!");
    }
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("github_user"); // Clear GitHub user data if stored
    toast.info("Logged out successfully!");
  };

  // Auto-load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const githubUser = localStorage.getItem("github_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (githubUser) {
      setUser(JSON.parse(githubUser)); // Set GitHub user if present
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
