import React, { useState } from 'react';
import Header from '../../components/Header'; // Assuming you have a Header component

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

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Header /> {/* Your custom Header component */}
      <div className="flex flex-col max-w-6xl mx-auto mt-8">
        {/* Profile Section */}
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="relative">
            <img
              className="w-full h-64 object-cover"
              src="https://via.placeholder.com/1500x500" // Fallback cover photo URL
              alt="Cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/1500x500"; // Fallback image URL in case of error
              }}
            />
            <div className="absolute top-40 left-4 transform -translate-y-1/2 z-10">
              <img
                className="h-32 w-32 rounded-full object-cover border-4 border-white"
                src="http://res.cloudinary.com/dihmqs39z/image/upload/v1717393349/ll3mgk5u2p1cvtzrjwyl.jpg" // Profile photo URL
                alt="User Avatar"
              />
            </div>
            <div className="absolute top-64 left-44 transform -translate-y-1/2 z-10">
              <div className="text-left">
                <h1 className="text-2xl font-bold">User Name</h1>
                <p className="text-gray-600">@username</p>
                <p className="text-gray-600">2.5K friends</p>
              </div>
            </div>
          </div>
        </div>
        {/* Posts Section */}
        <div className="w-full mt-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
          {/* Display User Posts */}
          <div className="mt-4">
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-lg overflow-hidden border-l-4 border-violet-500 mt-4"
              >
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-2">{post.timestamp}</p>
                  <p className="text-lg">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
