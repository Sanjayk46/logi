import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useContext";
import "./home.css";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <h1>Welcome to the App</h1>
      {user ? (
        <>
          <p>Logged in as <strong>{user.name}</strong>.</p>
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
