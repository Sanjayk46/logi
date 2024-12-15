// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/useContext'; // assuming useAuth is your context

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth(); // get user from context

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" />} // Redirect to login if not authenticated
    />
  );
};

export default PrivateRoute;
