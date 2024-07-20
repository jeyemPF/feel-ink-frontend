import React from 'react';
import { PlusOutlined, EditOutlined, CameraOutlined } from '@ant-design/icons';

const ProfileInfo = ({ toggleDropdown }) => (
  <div className="w-full flex justify-center relative mt-8">
    <div className="absolute -top-28 w-10/12 flex flex-col md:flex-row items-center p-4 rounded md:gap-8">
      <div className="relative left-4">
        <img
          src="https://res.cloudinary.com/dihmqs39z/image/upload/v1720565151/v5-portrait-of-thomas-shelby-peaky-blinders-v0-owp85jioauna1_vrieuc.webp"
          alt="Avatar"
          className="w-44 h-44 md:w-44 md:h-44 rounded-full border-4 border-white cursor-pointer select-none"
          onClick={toggleDropdown}
        />
        <div
          className="absolute bottom-2 right-1 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <CameraOutlined className="text-white" />
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-grow text-center md:text-start relative md:pt-20 md:gap-64 items-center md:w-auto w-full">
        <div className="mb-1 md:mb-0 relative items-center">
          <h1 className="text-3xl md:text-3xl font-bold">Thomas Shelby</h1>
          <p className="text-gray-600 font-thin text-sm">4 Publish Inks</p>
        </div>
        <div className="absolute top-16 md:right-0 flex flex-wrap md:flex-row gap-3 md:pt-6 md:px-0 justify-center md:w-auto w-full">
          <button className="bg-violet-800 hover:bg-violet-700 text-white text-sm py-2 px-4 md:py-2 md:px-3 rounded min-w-min">
            <PlusOutlined /> Write post
          </button>
          <button className="border border-violet-800 text-violet-800 text-sm py-2 px-4 md:py-2 md:px-3 rounded min-w-min hover:bg-white-800 hover:text-violet-600 hover:border-violet-600">
            <EditOutlined /> Edit profile
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileInfo;
