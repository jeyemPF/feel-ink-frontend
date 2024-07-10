// components/dropdowns/ProfileDropdown.js
import React, { useState } from 'react';



const ProfileDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative">
      <img
        src="https://res.cloudinary.com/dihmqs39z/image/upload/v1720565151/v5-portrait-of-thomas-shelby-peaky-blinders-v0-owp85jioauna1_vrieuc.webp"
        alt="Avatar"
        className="w-6 h-6 rounded-full mx-4 cursor-pointer"
        onClick={toggleDropdown}
      />
      

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
          <div className="px-4 py-3 flex items-center">
    
            <div className="flex flex-col">
              <p className="text-violet-800 font-bold  ">John Doe</p>
              <p className="text-gray-600 text-sm truncate w-48">
                johndoe@exampleverylongdomainname.com
              </p>
            </div>
          </div>
          <hr className="my-1" />
          <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Profile 
          </a>
          <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
             Settings
          </a>
          <hr className="my-1" />
          <a href="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
