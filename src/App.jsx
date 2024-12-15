import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/useContext";
import Navbar from "./component/navbar/navbar";
import Dashboard from "./component/dashboard/Dashboard";
import Login from "./component/login/Login";
import Home from "./component/Home/Home";
import "./App.css";
import PrivateRoute from './component/PrivateRoute';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Directly use Route for Dashboard and apply conditional redirection */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
