import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useContext";
import "./dashboard.css";

const Dashboard = () => {
  const { user, setUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Load GitHub user details from query params or localStorage
  useEffect(() => {
    if (!user) {
      const queryParams = new URLSearchParams(location.search);
      const userData = queryParams.get("user");
      const token = queryParams.get("token");

      if (userData && token) {
        try {
          const parsedUser = JSON.parse(decodeURIComponent(userData));
          setUser({ ...parsedUser, token }); // Save user in context
          localStorage.setItem(
            "github_user",
            JSON.stringify({ ...parsedUser, token })
          );
        } catch (error) {
          console.error("Error parsing GitHub user data:", error);
          navigate("/login");
        }
      } else {
        const storedUser = localStorage.getItem("github_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          navigate("/login");
        }
      }
    }
  }, [location, setUser, user, navigate]);

  if (!user) {
    return <div>Loading user details...</div>;
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
          <p>Welcome, {user.name || user.login || "GitHub User"}</p>
          <p>Email: {user.email || "Not available"}</p>
          <img
            src={user.avatar_url}
            alt="GitHub Avatar"
            className="user-avatar"
          />
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-content">
        <h1>Welcome to your GitHub Dashboard</h1>
        <p>Use the sidebar to navigate through the app.</p>
        <p>Your GitHub username: <strong>{user.login}</strong></p>
        <a
          href={`https://github.com/${user.login}`}
          target="_blank"
          rel="noopener noreferrer"
          className="github-profile-link"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
