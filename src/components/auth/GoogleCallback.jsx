import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        console.error('No code found');
        navigate('/');
        return;
      }

      try {
        // Exchange code for token
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/google/callback`, {
          params: { code },
        });

        localStorage.setItem('access_token', response.data.token);
        navigate('/dashboard');
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/');
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <div>
      <p>Processing...</p>
    </div>
  );
};

export default GoogleCallback;
