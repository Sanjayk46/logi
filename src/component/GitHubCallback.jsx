import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GitHubCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");


    if (code) {
      // Send the authorization code to the backend
      fetch("https://login-backend-9cim.onrender.com/auth/github/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
        credentials: "include", // Include cookies for session-based auth
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Failed to authenticate with GitHub");
        })
        .then(() => {
          // Redirect to the dashboard or handle login success
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("GitHub authentication failed:", error);
          navigate("/login");
        });
    } else {
      console.error("No authorization code found");
      navigate("/login");
    }
  }, [location, navigate]);

  return <div>Authenticating with GitHub...</div>;
};

export default GitHubCallback;
