// src/components/auth/GoogleCallback.jsx
import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppProvider, { AppContext } from '../../context/AppContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const { handleGoogleSignIn } = useContext(AppProvider);
  const apiUrl = import.meta.env.GOOGLE_REDIRECT_URI;

  useEffect(() => {
    const handleLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const response = await fetch(`${apiUrl}auth/google/callback?code=${code}`);
          const data = await response.json();

          if (response.ok) {
            // Set token and user data
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log('Login successful:', data); // Log success message
            navigate('/dashboard');
          } else {
            console.error('Failed to authenticate with Google:', data.error);
            navigate('/login');
          }
        } catch (error) {
          console.error('Error during Google Sign-In:', error);
          navigate('/login');
        }
      } else {
        console.error('No authorization code found');
        navigate('/login');
      }
    };

    handleLogin();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
