import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useContext";

const GitHubCallback = () => {
  const { setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userData = queryParams.get("user");
    const token = queryParams.get("token");
    console.log(token);
    console.log(userData);
    if (userData && token) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userData)); // Decode user data
        setUser({ ...parsedUser, token }); // Store user data in context

        // Save user data to localStorage for persistence
        localStorage.setItem("user", JSON.stringify(parsedUser));
        localStorage.setItem("token", token);

        navigate("/dashboard"); // Redirect to dashboard
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.error("Missing user or token in URL");
    }
  }, [location, setUser, navigate]);

  return <div>Authenticating...</div>; // Show a loading message
};

export default GitHubCallback;
