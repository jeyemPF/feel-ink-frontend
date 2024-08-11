import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AppContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      // Save the token and fetch user data if necessary
      localStorage.setItem('access_token', token);
      setToken(token);

      // Optionally, fetch user data using the token
      // fetchUserData(token).then(user => {
      //   setUser(user);
      // });

      // Redirect to the dashboard
      navigate('/dashboard');
    } else {
      console.error('No token found');
      navigate('/login');
    }
  }, [navigate, setToken, setUser]);

  return <div>Loading...</div>;
};

export default LoginSuccess;