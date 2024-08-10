// src/components/context/AppContext.jsx

import React, { createContext, useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [user, setUser] = useState(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage && userFromLocalStorage !== "undefined") {
      try {
        return JSON.parse(userFromLocalStorage);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  // Fetch user data if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${apiUrl}/api/user/data`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUser(data.user);
          localStorage.setItem('user', JSON.stringify(data.user));
        } catch (err) {
          console.error('Failed to fetch user data:', err);
          setUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async (googleToken) => {
    try {
      // Send Google token to backend for verification and exchange for access token
      const response = await fetch(`${apiUrl}/auth/google/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleToken }),
      });

      if (response.ok) {
        const data = await response.json();
        // Set token and user data
        setToken(data.access_token);
        setUser(data.user);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Login successful:', data); // Log success message
      } else {
        console.error('Failed to authenticate with Google');
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser, loading, handleGoogleSignIn }}>
      {children}
    </AppContext.Provider>
  );
}
