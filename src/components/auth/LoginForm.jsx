import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with', { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="mb-4">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none placeholder-gray-400"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none placeholder-gray-400"
          placeholder="Enter your password"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-sm focus:outline-none"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
