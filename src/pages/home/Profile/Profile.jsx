import React, { useContext, useState, useRef } from 'react';
import Header from '../../../components/Header';
import CropComponent from '../../../components/CropComponent';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';    
import MyInks from './MyInks';
import { AppContext } from '../../../context/AppContext';

const Profile = () => {
  const { user } = useContext(AppContext);
  const [postContent, setPostContent] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(user?.cover_photo || 'https://via.placeholder.com/1500x500');
  const [cropImage, setCropImage] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const fileInputRef = useRef(null);

  const handlePostChange = (e) => setPostContent(e.target.value);

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
      reader.onload = () => {
        setCropImage(reader.result);
        setShowCrop(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage) => {
    setCoverPhoto(croppedImage);
    setShowCrop(false);
  };

  const toggleDropdown = () => {
    console.log('Dropdown toggled');
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto mt-8 rounded">
      <Header />
      {showCrop && cropImage ? (
        <CropComponent
          imageSrc={cropImage}
          onCancel={() => setShowCrop(false)}
          onCropComplete={handleCropComplete}
        />
      ) : (
        <>
          <ProfileHeader
            coverPhoto={coverPhoto}
            onCoverPhotoChange={handleCoverPhotoChange}
            fileInputRef={fileInputRef}
          />
          <ProfileInfo
            toggleDropdown={toggleDropdown}
            avatar={user?.avatar}  // Pass avatar URL from user context
            name={user?.name}     // Pass name from user context
          />
          <MyInks />
        </>
      )}
    </div>
  );
};

export default Profile;
