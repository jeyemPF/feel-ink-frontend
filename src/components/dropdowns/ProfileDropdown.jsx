import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const apiUrl = import.meta.env.VITE_API_URL;

const ProfileDropdown = ({ direction, avatar, username, email }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AppContext);

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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        await axios.post(`${apiUrl}/api/logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      
      setUser(null);
      setToken(null);

      navigate('/login');
    } catch (error) {
      console.error('Logout Failed', error);  
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <img
        src={avatar || 'https://via.placeholder.com/150'}
        alt="Avatar"
        className="w-6 h-6 rounded-full mx-4 cursor-pointer hover:opacity-80 transition-opacity duration-200 select-none"
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div
          className={`absolute ${direction === 'up' ? 'bottom-10' : 'mt-2'} right-0 w-64 bg-white dark:bg-[#242526] rounded-md shadow-lg border border-gray-200 dark:border-violet-900 z-10`}
        >
          <div className="px-4 py-3 flex items-center">
            <img
              src={avatar || 'https://via.placeholder.com/150'}
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-3 select-none"
            />
            <div className="flex flex-col">
              <p className="text-violet-800 dark:text-white font-bold">{username || 'User'}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm truncate w-48">
                {email || 'user@example.com'}
              </p>
            </div>
          </div>
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <a
            href="/profile"
            className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#242526] hover:text-violet-700 dark:hover:text-violet-600 transition-colors duration-200 text-sm"
          >
            Profile
          </a>
          <hr className="my-1 border-gray-200 dark:border-gray-700" />
          <button 
            onClick={handleLogout}
            className="text-sm block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#242526] hover:text-violet-700 dark:hover:text-violet-600 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
