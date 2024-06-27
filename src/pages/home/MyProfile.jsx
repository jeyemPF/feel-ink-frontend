import React, { useState } from 'react';
import Header from '../../components/Header'; // Assuming you have a Header component

const Profile = () => {
  const [postContent, setPostContent] = useState('');

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the posting logic, like an API call
    console.log('Posting:', postContent);
    // Reset the input after posting
    setPostContent('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header /> {/* Your custom Header component */}
      <div className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center p-6">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="https://via.placeholder.com/150"
            alt="User Avatar"
          />
          <div className="ml-4">
            <h1 className="text-xl font-bold">User Name</h1>
            <p className="text-gray-600">@username</p>
          </div>
        </div>
        <form onSubmit={handlePostSubmit} className="px-6 py-4">
          <textarea
            className="w-full border rounded-md p-2 focus:outline-none"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={handlePostChange}
            rows="3"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-violet-500 text-white py-2 px-4 rounded-md hover:bg-violet-600 focus:outline-none"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
