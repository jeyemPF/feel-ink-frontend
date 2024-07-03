import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { PlusOutlined, HomeOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import logo from '../assets/logo/logos.png';
import ProfileDropdown from './dropdowns/ProfileDropdown';

const { Title } = Typography;

const Header = ({ addCard, disableAddButton }) => {
  return (
    <header className="text-violet-800 py-2 px-3 flex justify-between items-center border-2">
      <div className="flex flex-row flex-grow">
        {/* Use Link to navigate to the dashboard */}
        <Link to="/dashboard" className="flex items-center">
          <img src={logo} alt="Feelink Logo" className="w-10 h-10" />
          <Title level={3} style={{ color: '#5B21B6', fontWeight: "bold"}} className="font-bold justify-start text-justify pt-1">
            Feel ink
          </Title>
        </Link>
      </div>

      <div className="flex items-center ml-auto">
        {/* HomeOutlined now navigates to the dashboard */}
        <Link to="/dashboard" className={`ml-4 text-violet hover:text-violet-500 ${disableAddButton ? 'cursor-not-allowed opacity-50' : ''}`}>
          <HomeOutlined />
        </Link>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
