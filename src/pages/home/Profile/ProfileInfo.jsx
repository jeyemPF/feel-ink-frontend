import React, { useState, useRef } from 'react';
import { PlusOutlined, EditOutlined, CameraOutlined } from '@ant-design/icons';
import EditProfileModal from '../../../components/modals/EditProfileModal';


const ProfileInfo = ({ toggleDropdown }) => {
  const [avatarUrl, setAvatarUrl] = useState("https://res.cloudinary.com/dihmqs39z/image/upload/v1720565151/v5-portrait-of-thomas-shelby-peaky-blinders-v0-owp85jioauna1_vrieuc.webp");
  const [previewUrl, setPreviewUrl] = useState(null); // To show a preview of the selected image
  const [showModal, setShowModal] = useState(false); // State to show/hide modal
  const [name, setName] = useState("Thomas Shelby");
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check if the selected file is an image
      if (!file.type.startsWith('image/')) {
        console.error('Selected file is not an image');
        return;
      }

      // Create a preview URL for the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload the file to your server or cloud storage
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'your_upload_preset'); // If using Cloudinary

      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
        
        const data = await response.json();
        console.log('Uploaded image data:', data);
        
        if (data.secure_url) {
          setAvatarUrl(data.secure_url); // Update avatar URL with the new image URL
          setPreviewUrl(null); // Clear preview URL once the upload is complete
        } else {
          console.error('No secure URL returned in the response');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleSaveChanges = () => {
    setShowModal(false);
    // You can add any additional logic to save changes here
  };

  return (
    <div className="w-full flex justify-center relative mt-8">
      <div className="absolute -top-28 w-10/12 flex flex-col md:flex-row items-center p-4 rounded md:gap-8">
        <div className="relative left-4">
          <img
            src={previewUrl || avatarUrl} // Show preview if available, otherwise show the current avatar
            alt="Avatar"
            className="w-44 h-44 md:w-44 md:h-44 rounded-full border-4 border-white cursor-pointer select-none"
            onClick={() => fileInputRef.current.click()}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
          <div
            className="absolute bottom-2 right-1 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer"
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
            <h1 className="text-3xl md:text-3xl font-bold">{name}</h1>
            <p className="text-gray-600 font-thin text-sm">4 Publish Inks</p>
          </div>
          <div className="absolute top-16 md:right-0 flex flex-wrap md:flex-row gap-3 md:pt-6 md:px-0 justify-center md:w-auto w-full">
            <button className="bg-violet-800 hover:bg-violet-700 text-white text-sm py-2 px-4 md:py-2 md:px-3 rounded min-w-min">
              <PlusOutlined /> Write post
            </button>
            <button 
              className="border border-violet-800 text-violet-800 text-sm py-2 px-4 md:py-2 md:px-3 rounded min-w-min hover:bg-white-800 hover:text-violet-600 hover:border-violet-600"
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
          setName={setName}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          onClose={() => setShowModal(false)}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default ProfileInfo;
