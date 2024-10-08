import React, { useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Header from '../../../components/Header';
import CropComponent from '../../../components/CropComponent';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import PhotoHistory from './PhotoHistory';
import MyInks from './MyInks';
import { AppContext } from '../../../context/AppContext';

const apiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { user, setUser } = useContext(AppContext);
  const [postContent, setPostContent] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(user?.cover_photo || 'https://via.placeholder.com/1500x500');
  const [cropImage, setCropImage] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const [photoHistory, setPhotoHistory] = useState([]);

  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const token = localStorage.getItem('access_token'); 


  

  const handlePostChange = (e) => setPostContent(e.target.value);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        id: userPosts.length + 1,
        content: postContent,
        timestamp: new Date().toLocaleString(),
      };
      setUserPosts((prevPosts) => [newPost, ...prevPosts]);
      setPostContent('');
    } catch (error) {
      console.error('Failed to submit post:', error);
    }
  };

  const handleCoverPhotoChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setCropImage(reader.result);
          setShowCrop(true); 
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Failed to handle cover photo change:', error);
    }
  };

  const handleCropComplete = async (croppedImageFile) => {
    try {
      setCoverPhoto(URL.createObjectURL(croppedImageFile)); 
      setShowCrop(false);

      const formData = new FormData();
      formData.append('cover_photo', croppedImageFile); 

      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('You must be logged in to perform this action.');
        return;
      }

      const response = await axios.post(`${apiUrl}/api/user/cover-photo/${user.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.cover_photo) {
        setUser({ ...user, cover_photo: response.data.cover_photo });
      }
    } catch (error) {
      console.error('Failed to update cover photo:', error.response?.data?.message || error.message);
      setError('Failed to update cover photo.');
    }
  };


  useEffect(() => {
    const fetchPhotoHistory = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/user/photo-history/${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log(data.photo_history);
        setPhotoHistory(data.photo_history); 
      } catch (error) {
        console.error("Error fetching photo history:", error);
      }
    };
  
    if (user?.id && token) {
      fetchPhotoHistory();
    }
  }, [user?.id, token]);
  
  

  const handleAvatarChange = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (!file) {
      setError('Please select an avatar to upload.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('No token found, please log in again.');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/update-profile/${user.id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUser({ ...user, avatar: response.data.user.avatar });
      alert('Avatar updated successfully!');
    } catch (error) {
      setError('Failed to update avatar. Please try again.');
      console.error('Avatar update error:', error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    console.log('Dropdown toggled');
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen dark:bg-[#18191A]">Loading...</div>;
  }

  return (
    <div className='dark:bg-[#18191A] min-h-screen'>

     <div className='dark:bg-[#292b2d] pb-52 md:pb-32'>
        <div className="flex flex-col max-w-6xl mx-auto mt-8 rounded dark:bg-[#292b2d] transition-all duration-300 ">
          <Header />
          {showCrop && cropImage ? (
            <CropComponent
              imageSrc={cropImage}
              onCancel={() => setShowCrop(false)}
              onCropComplete={handleCropComplete}
              className="dark:bg-[#292b2d]"
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
                avatar={user.avatar}
                name={user.name}
                handleAvatarChange={handleAvatarChange}
              />
            </>
          )}
     
        </div>
        </div>
        <div className='dark:bg-[#18191A] flex flex-col-reverse justify-center md:flex-row-reverse  '>
          <div>
              <MyInks 
              post={userPosts} 
              />
          </div>
          <div>
            <PhotoHistory photoHistory={photoHistory} />
          </div>
        
            
          
        </div>

      
      
    </div>
  );
};

export default Profile;
