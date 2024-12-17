import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/navbar";
import Home from "./component/Home/Home";
import Login from "./component/login/Login";
import Dashboard from "./component/dashboard/Dashboard";
import GitHubCallback from "./component/GitHubCallback";
import AuthRoute from "./component/PrivateRoute";

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/github/callback" element={<GitHubCallback />} />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
    </Routes>
  </>
);

export default App;
