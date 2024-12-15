import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/useContext";
import Navbar from "./component/navbar/navbar";
import Dashboard from "./component/dashboard/Dashboard";
import Login from "./component/login/Login";
import Home from "./component/Home/Home";
import PrivateRoute from "./component/PrivateRoute"; // import the PrivateRoute component
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          
          {/* Use PrivateRoute only for the dashboard route */}
          <PrivateRoute path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
