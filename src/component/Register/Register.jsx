import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useContext";  // Ensure useAuth is correctly implemented
import { toast } from "react-toastify"; // Ensure toast is imported correctly
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, user } = useAuth();  // Make sure 'register' is a function in your context
  const navigate = useNavigate();  // Changed history to navigate
  
  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await register({ name, email, password });
      navigate('/login'); // Use navigate for redirection
    } catch (error) {
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Register</h1> {/* Changed Login to Register */}
        <form className="login-form" onSubmit={handleEmailPasswordLogin}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"  // Changed to 'text' as 'name' is a text field
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
