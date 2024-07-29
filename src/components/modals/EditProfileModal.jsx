import React from 'react';
import { Typography } from 'antd';
import { ShrinkOutlined } from '@ant-design/icons';

const { Title } = Typography;

const EditProfileModal = ({ name, setName, handleFileChange, fileInputRef, onClose, onSave }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex justify-center flex-1">
            <Title
              level={3}
              style={{
                color: '#5B21B6',
                fontWeight: 'bold',
                fontFamily: 'Lobster, cursive',
                textAlign: 'center',
              }}
            >
              Edit Profile
            </Title>
          </div>
          <ShrinkOutlined
            className="text-lg text-gray-500 hover:text-gray-800 cursor-pointer"
            onClick={onClose}
          />
        </div>
 
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none placeholder-gray-400 focus:border-violet-500 text-sm"
            placeholder="Enter your name"
            style={{ padding: '9px', lineHeight: '1.4' }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
            Avatar
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="avatar"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-sm w-full focus:outline-none"
            onClick={() => fileInputRef.current.click()}
            style={{
              backgroundColor: '#5B21B6',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7C3AED'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5B21B6'}
          >
            Change Avatar
          </button>
        </div>
        <div className="flex items-center justify-between mb-6">
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-sm w-full focus:outline-none"
            onClick={onSave}
            style={{
              backgroundColor: '#5B21B6',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7C3AED'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5B21B6'}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
