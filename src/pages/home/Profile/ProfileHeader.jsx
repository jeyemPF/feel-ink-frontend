import React from 'react';
import { CameraOutlined } from '@ant-design/icons';

const ProfileHeader = ({ coverPhoto, onCoverPhotoChange, fileInputRef }) => (
  <div className="relative w-full flex justify-center items-center">
    <img
      className="w-full lg:w-10/12 md:w-10/12 h-21rem object-cover rounded select-none"
      src={coverPhoto}
      alt="Cover"
      onError={(e) => {
        e.target.src = 'https://via.placeholder.com/1500x500';
      }}
    />
    <input
      ref={fileInputRef}
      type="file"
      id="coverPhoto"
      className="hidden"
      onChange={onCoverPhotoChange}
    />
    <label
      htmlFor="coverPhoto"
      className="absolute bottom-4 right-6 md:right-32 dark:text-[#ffffff] dark:bg-[#3e3e3e] bg-white text-black py-2 px-4 md:px-2 rounded cursor-pointer text-sm flex items-center space-x-2 shadow-md hover:bg-gray-200 transition duration-200 z-10"
    >
      <CameraOutlined />
      <span className="font-thin md:block hidden dark:text-[#ffffff]">Add cover photo</span>
    </label>
  </div>
);

export default ProfileHeader;
