import React, { useState, useRef, useContext } from 'react';
import { PlusOutlined, EditOutlined, CameraOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditProfileModal from '../../../components/modals/EditProfileModal';
import { AppContext } from '../../../context/AppContext';

const apiUrl = import.meta.env.VITE_API_URL;

const ProfileInfo = ({ toggleDropdown, avatar, handleAvatarChange, token }) => {
  const { user, setUser } = useContext(AppContext);
  const [name, setName] = useState(user.name); // Add state for name
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        console.error('Selected file is not an image');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      handleAvatarChange(event);
    }
  };

  const handleSaveChanges = async (newName) => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.put(`${apiUrl}/api/user/update-name/${user.id}`, 
        { name: newName },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        setName(updatedUser.name); // Update the local name state
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating name:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full flex justify-center relative mt-8 dark:bg-[#ffffff]">
      <div className="absolute -top-28 w-10/12 flex flex-col md:flex-row items-center p-4 rounded md:gap-8 ">
        <div className="relative left-4">
          <img
            src={previewUrl || avatar}
            alt="Avatar"
            className="w-44 h-44 md:w-44 md:h-44 rounded-full border-4 border-white dark:border-[#602888] cursor-pointer select-none"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
          <div
            className="absolute bottom-2 right-1 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors duration-200"
            onClick={() => fileInputRef.current.click()}
          >
            <CameraOutlined className="text-white" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            id="avatarInput"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col md:flex-row flex-grow text-center md:text-start relative md:pt-20 md:gap-64 items-center md:w-auto w-full">
          <div className="mb-1 md:mb-0 relative items-center">
            <h1 className="text-3xl md:text-3xl font-bold  dark:text-[#D3D3D3]">{name}</h1>
            <p className="text-gray-600 font-thin text-sm dark:text-[#b2afaf]">4 Publish Inks</p>
          </div>
          <div className="absolute top-16 md:right-0 flex flex-wrap md:flex-row gap-3 md:pt-6 md:px-0 justify-center md:w-auto w-full">
            <button 
              className="bg-violet-800 hover:bg-violet-700 text-white text-sm py-2 px-4 md:py-2 md:px-3 rounded min-w-min dark:text-[#D3D3D3]"
              onClick={() => navigate('/dashboard')}
            >
              <PlusOutlined /> Write post
            </button>
            <button 
              className=" border border-violet-800 text-violet-800 text-sm py-2 px-4 md:py-2 md:px-3 rounded min-w-min hover:bg-white-800 hover:text-violet-600 hover:border-violet-600 dark:text-[#D3D3D3]"
              onClick={() => setShowModal(true)}
            >
              <EditOutlined /> Edit profile
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <EditProfileModal
          name={name}
          setName={setName} // Pass setName to EditProfileModal if needed
          onClose={() => setShowModal(false)}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
