import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import logo from '../assets/logo/logos.png';
import ProfileDropdown from './dropdowns/ProfileDropdown';

const { Title } = Typography;

const Header = ({ addCard, disableAddButton }) => {
  return (
    <header className="text-violet-800 py-2 px-8 flex justify-between items-center border-2">
      <div className="flex flex-row flex-grow">
        <img src={logo} alt="Feelink Logo" className="w-10 h-10" />
        <Title level={3} style={{ color: '#5B21B6', fontWeight: "bold"}} className="font-bold justify-start text-justify pt-1">
          Feel ink
        </Title>
      </div>

      <div className="flex items-center ml-auto">
        <button
          className={`ml-4 text-violet hover:text-violet-500 ${disableAddButton ? '' : ''}`}
          onClick={addCard}
          disabled={disableAddButton} 
        >
          <PlusOutlined />
        </button>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
