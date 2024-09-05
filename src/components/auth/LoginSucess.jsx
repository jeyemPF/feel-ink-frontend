// src/components/auth/LoginSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

const LoginSuccess = () => {
  const { handleGoogleSignIn } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const googleToken = query.get('token');

    if (googleToken) {
      handleGoogleSignIn(googleToken);
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [handleGoogleSignIn, navigate]);

  return <div>Loading...</div>;
};

export default LoginSuccess;
