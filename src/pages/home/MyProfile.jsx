  import React, { useState } from 'react';
  import Header from '../../components/Header'; // Assuming you have a Header component
  import { CameraOutlined } from '@ant-design/icons';

  const Profile = () => {
    const [postContent, setPostContent] = useState('');
    const [userPosts, setUserPosts] = useState([]);

    const handlePostChange = (e) => {
      setPostContent(e.target.value);
    };

    const handlePostSubmit = (e) => {
      e.preventDefault();
      // Simulate posting logic
      const newPost = {
        id: userPosts.length + 1,
        content: postContent,
        timestamp: new Date().toLocaleString(),
      };
      setUserPosts([newPost, ...userPosts]);
      // Reset the input after posting
      setPostContent('');
    };

    const handleCoverPhotoChange = (e) => {
      // Logic to handle cover photo change
      console.log(e.target.files[0]);
    };

    const toggleDropdown = () => {
      // Define the logic for toggling the dropdown
      console.log('Dropdown toggled');
    };

    return (
      <div className="min-h-screen bg-gray-100 pt-8">
        <Header /> {/* Your custom Header component */}
        <div className="flex flex-col max-w-6xl mx-auto mt-8">
          {/* Profile Section */}
          <div className="relative w-full flex justify-center items-center">
            <img
              className="w-10/12 h-22rem object-cover rounded"
              src="https://via.placeholder.com/1500x500" // Fallback cover photo URL
              alt="Cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/1500x500"; // Fallback image URL in case of error
              }}
            />
            <input
              type="file"
              id="coverPhoto"
              className="hidden"
              onChange={handleCoverPhotoChange}
            />
            <label
              htmlFor="coverPhoto"
              className="absolute bottom-4 right-32 bg-white text-black py-2 px-4 rounded cursor-pointer text-sm flex items-center space-x-2 shadow-md hover:bg-gray-200 transition duration-200"
            >
              <CameraOutlined />
              <span className='font-thin'>Add cover photo</span>
            </label>
          </div>
          <div className="w-full flex justify-center relative mt-8 bg-yellow-300 ">
            <div className="absolute -top-28 w-10/12 flex items-center p-4 rounded  gap-8">
              <div className="relative left-4">
                <img
                  src="http://res.cloudinary.com/dihmqs39z/image/upload/v1717393349/ll3mgk5u2p1cvtzrjwyl.jpg"
                  alt="Avatar"
                  className="w-44 h-44  rounded-full border-4 border-white cursor-pointer"
                  onClick={toggleDropdown}
                />
              </div>
              <div className="flex flex-col text-start relative pt-20 ">
                <h1 className="text-3xl font-bold ">Johnmack Faeldonia</h1>
                <p className="text-gray-600">4 Publish content</p>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    );
  };

  export default Profile;
