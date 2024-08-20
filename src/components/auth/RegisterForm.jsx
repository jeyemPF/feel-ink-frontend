import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setLoading(false);
      return;
    }

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
      <div className="mb-4 relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none placeholder-gray-400 focus:border-violet-500 text-sm"
          placeholder="Enter your password"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 pb-2 flex items-center text-gray-500 cursor-pointer"
        >
          {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
      </div>
      <div className="mb-4 relative">
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
          className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none placeholder-gray-400 focus:border-violet-500 text-sm"
          placeholder="Confirm your password"
        />
        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute inset-y-0 right-0 pr-3 pb-2 flex items-center text-gray-500 cursor-pointer"
        >
          {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
        </span>
        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
      </div>
      <button
        type="submit"
        className={`text-white py-1 px-4 rounded-sm focus:outline-none w-full transition-colors duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5B21B6] hover:bg-[#7C3AED]'}`}
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      <div className="mt-4 text-center">
        <p className="text-gray-600 text-xs">
          Already have an account?{' '}
          <Link to="/login" className="text-violet-500 hover:text-violet-700 text-xs">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
