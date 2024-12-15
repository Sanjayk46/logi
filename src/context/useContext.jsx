import React, { createContext, useContext, useState, useEffect } from "react";
import AxiosService from "../AxiosService";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store user data

  // Login Function
  const login = async (email, password) => {
    try {
      const { data } = await AxiosService.post("/user/login", { email, password }); // API call
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // Save user data in localStorage
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed!");
    }
  };

  // Register Function
  const register = async (registerData) => {
    try {
      const { data } = await AxiosService.post("/user/register", registerData); // API call
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data)); // Save user data in localStorage
      toast.success("Registration successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed!");
    }
  };

  // Logout Function
  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("user"); // Clear localStorage
    toast.info("Logged out successfully!");
  };

  
  // Automatically load user from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
