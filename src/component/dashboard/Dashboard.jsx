import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useContext";
import "./dashboard.css";

const Dashboard = () => {
  const { user, setUser, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Get user data from URL params (after GitHub login redirect)
    const queryParams = new URLSearchParams(location.search);
    const userData = queryParams.get("user");
    const token = queryParams.get("token");

    if (userData && !user) {
      const parsedUser = JSON.parse(userData);
      setUser({ ...parsedUser, token });
    }
  }, [location, setUser, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
        <div className="sidebar-user">
          <p>Welcome, {user.name}</p>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-content">
        <h1>Welcome to the Dashboard</h1>
        <p>Use the sidebar to navigate through the app.</p>
      </div>
    </div>
  );
};

export default Dashboard;
