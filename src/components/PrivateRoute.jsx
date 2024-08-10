import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useContext(AppContext);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while checking auth status
  }

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
