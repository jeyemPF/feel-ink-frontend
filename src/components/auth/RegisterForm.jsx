// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/register`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || {});
      }
      console.error('Register error:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="w-full max-w-sm bg-inherit">
      <div className="mb-4">
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none placeholder-gray-400 focus:border-violet-500 text-sm"
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
      </div>
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
      <div className="mb-6 relative">
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
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;
