import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth(); // Get the user from context

  // Return the Route with conditional rendering
  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" />} // If user is not authenticated, redirect to login
    />
  );
};

export default PrivateRoute;
