import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

const LoginForm = () => {
  const { setToken, setUser } = useContext(AppContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setErrors({});
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email: formData.email,
        password: formData.password,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Login successful:', response.data);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setToken(response.data.access_token); // Update context or state
      setUser(response.data.user); // Update user context
      navigate('/dashboard'); // Redirect after successful login
    } catch (error) {
      if (error.response && error.response.data) {
        const { message, errors: serverErrors } = error.response.data;
        setError(message || 'An error occurred');
        setErrors(serverErrors || {});
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement your Google Sign-In logic here
    console.log('Google Sign-In button clicked');
  };

  return (
    <form onSubmit={handleLogin} className="w-full max-w-sm bg-inherit">
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      <div className="mb-4">
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none placeholder-gray-400 focus:border-violet-500 text-sm"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
      </div>
      <div className="mb-6">
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none placeholder-gray-400 focus:border-violet-500 text-sm"
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
      </div>
      <button
        type="submit"
        className={`text-white py-1 px-4 rounded-sm focus:outline-none w-full transition-colors duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5B21B6] hover:bg-[#7C3AED]'}`}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      <div className="mt-4 text-center">
        <p className="text-gray-600 mb-2">or</p>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-sm border border-gray-300 w-full flex items-center justify-center text-sm"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google Logo"
            className="h-4 mr-2"
          />
          Sign in with Google
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
