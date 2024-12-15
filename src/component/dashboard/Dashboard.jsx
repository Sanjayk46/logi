import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useContext";
import "./dashboard.css";

const Dashboard = () => {
  const { user, setUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already set in context or if we need to parse data from URL params
    if (!user) {
      // Get user data and token from the URL after GitHub login
      const queryParams = new URLSearchParams(location.search);
      const userData = queryParams.get("user");
      const token = queryParams.get("token");

      if (userData && token) {
        const parsedUser = JSON.parse(userData);
        setUser({ ...parsedUser, token });
      } else {
        // Redirect to login page if no valid data found
        navigate("/login");
      }
    }
  }, [location, setUser, user, navigate]);

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
