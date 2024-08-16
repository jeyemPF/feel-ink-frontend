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
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState(null);
  const [allPostLoading, setAllPostLoading] = useState(true);
  const [allPostError, setAllPostError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${apiUrl}/api/user/data`, { // Correct endpoint for user data
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
          } else {
            console.error('Failed to fetch user data:', data.message);
            setUser(null);
          }
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

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (token) {
        try {
          const response = await fetch(`${apiUrl}/api/user/data`, { // Adjusted endpoint
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setPosts(data.posts);
          } else {
            console.error('Failed to fetch user posts:', data.message);
            setPostError('Failed to fetch user posts');
          }
        } catch (err) {
          console.error('Failed to fetch user posts:', err);
          setPostError('Failed to fetch user posts');
        } finally {
          setPostLoading(false);
        }
      }
    };

    fetchUserPosts();
  }, [token]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/all/posts`, { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setAllPosts(data.posts);
        } else {
          console.error('Failed to fetch all posts:', data.message);
          setAllPostError('Failed to fetch all posts');
        }
      } catch (err) {
        console.error('Failed to fetch all posts:', err);
        setAllPostError('Failed to fetch all posts');
      } finally {
        setAllPostLoading(false);
      }
    };

    fetchAllPosts();
  }, [token]);

  const handleGoogleSignIn = async (googleToken) => {
    try {
      const response = await fetch(`${apiUrl}/auth/google/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        setUser(data.user);
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Login successful:', data); // Log success message
      } else {
        console.error('Failed to authenticate with Google:', await response.text());
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  return (
    <AppContext.Provider value={{
      token,
      setToken,
      user,
      setUser,
      loading,
      handleGoogleSignIn,
      posts,
      postLoading,
      postError,
      allPosts,
      allPostLoading,
      allPostError
    }}>
      {children}
    </AppContext.Provider>
  );
}
