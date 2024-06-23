
import React from 'react';

const Header = () => {
  return (
    <header className="bg-violet-500 text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Free Ink</h1>
      <div className="flex items-center">
        <a href="/history" className="text-white hover:underline mx-4">
          My Ink
        </a>
        <img
          src="http://res.cloudinary.com/drlztlr1m/image/upload/v1706979188/oxbsppubd3rsabqwfxsr.jpg"
          alt="Avatar"
          className="w-10 h-10 rounded-full mx-4"
        />
        <button className="bg-white text-violet-500 py-2 px-4 rounded-sm hover:bg-gray-100 focus:outline-none">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
