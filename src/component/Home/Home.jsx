import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useContext"; // Assuming the auth context is used here
import "./home.css";

const Home = () => {
  const { user, setUser } = useAuth(); // Using context to access user data
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Handle setting user info after GitHub login via query params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const userData = urlParams.get("user");
    const userToken = urlParams.get("token");

    if (userData && userToken) {
      const userProfile = JSON.parse(decodeURIComponent(userData));
      // Store user data and token in context (or localStorage, sessionStorage)
      setUser({ profile: userProfile, token: userToken });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [location, setUser]);

  // Show loading state until user data is available
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-container">
      <h1>Welcome to the App</h1>
      {user ? (
        <>
          <p>Logged in as <strong>{user.profile.name}</strong></p>
          <p>Email: <strong>{user.profile.email}</strong></p>
          <p>GitHub Username: <strong>{user.profile.login}</strong></p>
          <img src={user.profile.avatar_url} alt="User Avatar" className="user-avatar" />
          <Link to="/dashboard">
            <button className="cta-button">Go to Dashboard</button>
          </Link>
        </>
      ) : (
        <>
          <p>Please log in to access more features.</p>
          <Link to="/login">
            <button className="cta-button">Login Now</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
