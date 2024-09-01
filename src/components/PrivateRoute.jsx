import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import logo from '../assets/logo/logos.png';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
        <div className="text-center">
          {/* Logo with spin animation */}
          <img 
            src={logo} 
            alt="Loading Logo" 
            className="w-16 h-16 mx-auto mb-4 animate-spin"
          />
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Please wait.
          </p>
        </div>
      </div>
    );
  }

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
