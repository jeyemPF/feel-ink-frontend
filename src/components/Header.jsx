import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { AppContext } from '../context/AppContext';
import logo from '../assets/logo/logos.png';
import ProfileDropdown from './dropdowns/ProfileDropdown';

const { Title } = Typography;

const Header = ({ disableAddButton, onHomeClick }) => {
  const { user } = useContext(AppContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  const renderProfileDropdown = (direction) => (
    <ProfileDropdown
      direction={direction}
      avatar={user?.avatar}
      username={user?.name}
      email={user?.email}
    />
  );

  return (
    <>
      <header className=" transition-all duration-200 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#242526] md:bg-opacity-100 text-violet-800 dark:text-white py-2 px-3 flex justify-between items-center border-b border-gray-200 dark:border-violet-900">
        <div className="flex items-center justify-center flex-grow md:justify-start">
          <Link to="/dashboard" className="flex items-center">
            <img src={logo} alt="Feelink Logo" className="w-16 h-16 lg:w-10 md:h-10" />
            <Title
              level={3}
              style={{ color: darkMode ? '#5B21B6' : '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive' }}
              className="font-bold justify-start text-justify pt-1 md:block hidden"
            >
              Feel Ink
            </Title>
          </Link>
        </div>
        <div className="hidden md:flex items-center  justify-center">
          <button
            onClick={toggleDarkMode}
            
            className="text-violet hover:text-violet-500 dark:text-white dark:hover:text-violet-500" 
          >
            {darkMode ? <SunOutlined className="text-sm" /> : <MoonOutlined className="text-sm" />}
          </button>
          <Link
            to="/dashboard"
            className={`ml-4 text-violet hover:text-violet-500 dark:text-white dark:hover:text-violet-500   ${disableAddButton ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={onHomeClick}
          >
            <HomeOutlined className='text-sm' />
          </Link>
          {renderProfileDropdown('down')}
        </div>
      </header>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#18191a] border-t-1 z-50 md:hidden md:bg-opacity-50 bg-opacity-60">
        <div className="flex justify-around py-2">
          <button
            onClick={toggleDarkMode}
            className="text-violet-700 hover:text-violet-500 dark:text-white dark:hover:text-violet-500 "
          >
            {darkMode ? <SunOutlined className="text-sm " /> : <MoonOutlined className="text-sm" />}
          </button>
          <Link
            to="/dashboard"
            className={`text-violet-700 hover:text-violet-500 dark:text-white dark:hover:text-violet-500 ${disableAddButton ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <HomeOutlined className='text-sm' />
          </Link>
          {renderProfileDropdown('up')}
        </div>
      </nav>
    </>
  );
};

export default Header;
