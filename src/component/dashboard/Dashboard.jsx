import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useContext";
import "./dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul className="sidebar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
        {user && (
          <div className="sidebar-user">
            <p>Welcome, {user.name}</p>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="dashboard-content">
        <h1>Welcome to the Dashboard</h1>
        <p>Use the sidebar to navigate through the app.</p>
      </div>
    </div>
  );
};

export default Dashboard;
