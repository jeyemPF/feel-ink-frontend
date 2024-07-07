import React from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import logo from '../assets/logo/logos.png';
import ProfileDropdown from './dropdowns/ProfileDropdown'; // Import ProfileDropdown component

const { Title } = Typography;

const Header = ({ disableAddButton }) => {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white md:bg-opacity-100 bg-opacity-80 text-violet-800 py-2 px-3 flex justify-between items-center border-2">
        
        {/* Centered logo */}
        <div className="flex items-center justify-center flex-grow md:justify-start">
          <Link to="/dashboard" className="flex items-center">
            <img src={logo} alt="Feelink Logo" className="w-16 h-16 lg:w-10 md:h-10" /> {/* Adjusted logo size */}
            <Title level={3} style={{ color: '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive' }} className="font-bold justify-start text-justify pt-1 md:block hidden">Feel Ink</Title>
          </Link>
        </div>

        {/* Navigation icons (hidden on mobile screens) */}
        <div className="hidden md:flex items-center">
          <Link to="/dashboard" className={`ml-4 text-violet hover:text-violet-500 ${disableAddButton ? 'cursor-not-allowed opacity-50' : ''}`}>
            <HomeOutlined />
          </Link>
          
          {/* Profile Dropdown */}
          <ProfileDropdown />
        </div>

      </header>

      {/* Bottom Navigation (visible on mobile screens) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 z-50 md:hidden md:bg-opacity-50 bg-opacity-80">
        <div className="flex justify-around py-2">
          {/* Home Icon */}
          <Link to="/dashboard" className={`text-violet hover:text-violet-500 ${disableAddButton ? 'cursor-not-allowed opacity-50' : ''}`}>
            <HomeOutlined />
          </Link>
          
          {/* Profile Dropdown */}
          <ProfileDropdown />
        </div>
      </nav>
    </>
  );
};

export default Header;
