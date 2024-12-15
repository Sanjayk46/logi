import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useContext"; // Import the useAuth hook for user state management

const GitHubCallback = () => {
  const { setUser } = useAuth(); // Hook to set the user context
  const location = useLocation(); // Get the current URL and search params
  const navigate = useNavigate(); // To navigate to different pages after authentication

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search); // Extract query parameters from the URL
    const userData = queryParams.get("user");
    const token = queryParams.get("token");

    // If both user data and token are present in the URL
    if (userData && token) {
      try {
        // Decode and parse the user data, as it's URL encoded
        const parsedUser = JSON.parse(decodeURIComponent(userData));

        // Set the user in context and store it in localStorage
        setUser({ ...parsedUser, token });
        localStorage.setItem("user", JSON.stringify(parsedUser));
        localStorage.setItem("token", token);

        // Redirect to the dashboard or to a return URL if provided
        navigate("/dashboard"); // Redirect to the dashboard
      } catch (error) {
        console.error("Failed to parse user data:", error);
        navigate("/login"); // If error occurs, redirect back to login page
      }
    } else {
      // If user or token is missing from the query params
      console.error("Missing user or token in URL");
      navigate("/login"); // Redirect to login if no valid OAuth data is present
    }
  }, [location, setUser, navigate]);

  return <div>Authenticating...</div>; // Show loading message while processing the OAuth callback
};

export default GitHubCallback;
