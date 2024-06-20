import React from 'react';
import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="w-full max-w-md border-2 border-solid border-gray-150 py-10 px-5 md:py-20 md:px-20 rounded-lg">
        <h1 className="text-3xl mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
