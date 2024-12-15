import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useContext"; // Import the useAuth hook for authentication context
import "./dashboard.css";

const Dashboard = () => {
  const { user, setUser, logout } = useAuth(); // Access user data, setUser, and logout functions
  const location = useLocation(); // Get the current location (for query params)
  const navigate = useNavigate(); // To navigate programmatically

  useEffect(() => {
    // Check if user is already set in context or if we need to parse data from URL params
    if (!user) {
      const queryParams = new URLSearchParams(location.search);
      const userData = queryParams.get("user");
      const token = queryParams.get("token");

      if (userData && token) {
        try {
          const parsedUser = JSON.parse(decodeURIComponent(userData)); // Decode user data
          setUser({ ...parsedUser, token }); // Store the user in context
        } catch (error) {
          console.error("Error parsing user data:", error);
          navigate("/login"); // Redirect to login if data is invalid
        }
      } else {
        navigate("/login"); // Redirect to login if no valid data is found
      }
    } else {
      // If user is already authenticated, redirect to the dashboard
      navigate("/dashboard");
    }
  }, [location, setUser, user, navigate]);

  if (!user) {
    return <div>Loading...</div>; // Display a loading message while checking user authentication
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
