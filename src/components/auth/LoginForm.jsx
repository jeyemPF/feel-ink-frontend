import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = () => {
    console.log('Signing in with Google');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with', { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-inherit ">
      <div className="mb-4">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none placeholder-gray-400 focus:border-violet-500 text-sm"
          placeholder="Enter your email"
          style={{ padding: '9px', lineHeight: '1.4' }}
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none placeholder-gray-400 focus:border-violet-500 text-sm"
          placeholder="Enter your password"
          style={{ padding: '9px', lineHeight: '1.4' }}
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        {/* Regular Login Button */}
        <button
          type="submit"
          className="text-white py-1 px-4 rounded-sm focus:outline-none w-full"
          style={{ 
            backgroundColor: '#5B21B6', 
            transition: 'background-color 0.3s ease' 
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7C3AED'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5B21B6'}
        >
          Login
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-600 mb-2">or</p>
        {/* Google Sign-In Button */}
        <button
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
