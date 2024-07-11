import React, { useState, useRef } from 'react';
import Header from '../../components/Header';
import { CameraOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';

const Profile = () => {
  const [postContent, setPostContent] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState('https://via.placeholder.com/1500x500');
  const fileInputRef = useRef(null);

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: userPosts.length + 1,
      content: postContent,
      timestamp: new Date().toLocaleString(),
    };
    setUserPosts([newPost, ...userPosts]);
    setPostContent('');
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const maxSize = 1500;
          let width = image.width;
          let height = image.height;

          if (width > maxSize || height > maxSize) {
            if (width > height) {
              height *= maxSize / width;
              width = maxSize;
            } else {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);

          const resizedDataURL = canvas.toDataURL('image/jpeg');

          setCoverPhoto(resizedDataURL);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDropdown = () => {
    console.log('Dropdown toggled');
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-5">
      <Header />
      <div className="flex flex-col max-w-6xl mx-auto mt-8 rounded">
        <div className="relative w-full flex justify-center items-center">
          <img
            className="w-full lg:w-10/12 md:w-10/12 h-21rem object-cover rounded"
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
            onChange={handleCoverPhotoChange}
          />
          <label
            htmlFor="coverPhoto"
            className="absolute bottom-4 right-6 md:right-32 bg-white text-black py-2 px-4 md:px-2 rounded cursor-pointer text-sm flex items-center space-x-2 shadow-md hover:bg-gray-200 transition duration-200 z-10"
          >
            <CameraOutlined />
            <span className="font-thin md:block hidden">Add cover photo</span>
          </label>
        </div>
        <div className="w-full flex justify-center relative mt-8">
          <div className="absolute -top-28 w-10/12 flex flex-col md:flex-row items-center p-4 rounded md:gap-8">
            <div className="relative left-4">
              <img
                src="https://res.cloudinary.com/dihmqs39z/image/upload/v1720565151/v5-portrait-of-thomas-shelby-peaky-blinders-v0-owp85jioauna1_vrieuc.webp"
                alt="Avatar"
                className="w-44 h-44 md:w-44 md:h-44 rounded-full border-4 border-white cursor-pointer"
                onClick={toggleDropdown}
              />
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
      </div>
    </div>
  );
};

export default Profile;
