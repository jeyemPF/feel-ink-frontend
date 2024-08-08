import React, { useState, useEffect, useRef } from 'react';

const ProfileDropdown = ({ direction, avatar, username, email }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        src={avatar || 'https://via.placeholder.com/150'}  // Fallback if avatar is not available
        alt="Avatar"
        className="w-6 h-6 rounded-full mx-4 cursor-pointer"
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div
          className={`absolute ${direction === 'up' ? 'bottom-10' : 'mt-2'} right-0 w-64 bg-white rounded-md shadow-lg z-10`}
        >
          <div className="px-4 py-3 flex items-center">
            <img
              src={avatar || 'https://via.placeholder.com/150'}  // Display the avatar
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-3"
            />
            <div className="flex flex-col">
              <p className="text-violet-800 font-bold">{username || 'User'}</p>
              <p className="text-gray-600 text-sm truncate w-48">
                {email || 'user@example.com'}
              </p>
            </div>
          </div>
          <hr className="my-1" />
          <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
            Profile
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
