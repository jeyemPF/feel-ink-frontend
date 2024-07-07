import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import logo from '../../assets/logo/logos.png'; 

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md border-2 border-solid border-gray-150 py-10 px-5 rounded-lg flex flex-col items-center">
        <img src={logo} alt="Feelink Logo" className="mx-auto mt-5 mb-5 w-20 h-20" /> 
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
