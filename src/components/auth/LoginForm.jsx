import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

const LoginForm = () => {
  const { setToken } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Use the environment variable
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email: formData.email,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Login successful:', response.data);
      setToken(response.data.token); // Adjust based on your response
      navigate('/dashboard'); // Redirect after successful login
  
    } catch (error) {
      if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Body:', error.response.data);
        setError(`Login failed: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('No response received from the server.');
      } else {
        console.error('Error:', error.message);
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
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
    </form>
  );
};

export default LoginForm;
