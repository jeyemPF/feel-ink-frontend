// src/pages/auth/Login.jsx

import React from 'react';
import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl mb-4">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
