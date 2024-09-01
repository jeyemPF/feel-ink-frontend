import React from 'react';
import logo from '../assets/logo/logos.png';

const Loading = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
    <img 
      src={logo} 
      alt="Loading Logo" 
      className="w-16 h-16 mb-4 animate-spin"
    />
    <p className="text-gray-700 dark:text-gray-300 text-sm">
      Please wait while we fetch the latest posts and updates.
    </p>
  </div>
);

export default Loading;
