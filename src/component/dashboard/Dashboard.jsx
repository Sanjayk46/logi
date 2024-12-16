import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useContext";
import "./dashboard.css";

const Dashboard = () => {
  const { user, setUser, logout } = useAuth(); // Access user data, setUser, and logout functions
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already set in context or parse user from query params
    if (!user) {
      const queryParams = new URLSearchParams(location.search);
      const userData = queryParams.get("user");
      const token = queryParams.get("token");

      if (userData && token) {
        try {
          const parsedUser = JSON.parse(decodeURIComponent(userData)); // Parse user data
          setUser({ ...parsedUser, token }); // Store user in context
          localStorage.setItem(
            "github_user",
            JSON.stringify({ ...parsedUser, token })
          ); // Save user details to localStorage
        } catch (error) {
          console.error("Error parsing user data:", error);
          navigate("/login"); // Redirect to login if user data is invalid
        }
      } else {
        navigate("/login"); // Redirect to login if no valid data is found
      }
    }
  }, [location, setUser, user, navigate]);

  // Load user details from localStorage on reload if user context is empty
  useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem("github_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [user, setUser]);

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
          <p>Email: {user.email}</p>
          <img
            src={user.avatar_url}
            alt="GitHub Avatar"
            style={{ borderRadius: "50%", width: "100px" }}
          />
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-content">
        <h1>Welcome to the Dashboard</h1>
        <p>Use the sidebar to navigate through the app.</p>
        <p>Your GitHub username: {user.login}</p>
      </div>
    </div>
  );
};

export default Dashboard;
