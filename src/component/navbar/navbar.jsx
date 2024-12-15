import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useContext";
import "./navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">OAuthLogin</h1>
      </div>
      <div className="navbar-center">
        <Link to="/" className="navbar-link">Home</Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-username">Hello, {user.name}</span>
            <button className="navbar-logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar-link">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
