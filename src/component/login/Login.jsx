import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();
    // Replace with actual login logic
    console.log("Logging in with:", email, password);
  };

  const handleGitHubLogin = () => {
    window.location.href = "https://login-backend-9cim.onrender.com/auth/github";
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleEmailPasswordLogin}>
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
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p style={{"color":"blacko"}}>OR</p>
        <button className="github-button" onClick={handleGitHubLogin}>
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
