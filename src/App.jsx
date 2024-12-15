import React from "react";
import {  Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/navbar";
import Dashboard from "./component/dashboard/Dashboard";
import Login from "./component/login/Login";
import Home from "./component/Home/Home";
import GitHubCallback from './component/GitHubCallback';
import "./App.css";
import AuthRoute from './component/PrivateRoute';
const App = () => {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/auth/github/callback" element={<GitHubCallback />} />
          {/* <Route
            path="/dashboard"
            element={<AuthRoute element={<Dashboard />} />}
          /> */}
        </Routes>
    </>
  );
};

export default App;
