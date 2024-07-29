// src/pages/home/Profile/MyInks.jsx

import React, { useEffect, useState } from 'react';
import { Typography, Spin } from 'antd';
import PostedCard from '../../../components/home/PostedCard';

const { Title } = Typography;

const MyInks = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user posts from API
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch('/api/user/posts'); // Replace with your API endpoint
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleReaction = (id, reaction) => {
    console.log(`Reacted to post ${id} with ${reaction}`);
  };

  const openModal = (card) => {
    console.log(`Open modal for post ${card.id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 rounded w-full max-w-4xl mx-auto pt-40 md:pt-14">
      <div className="bg-red py-10">
        <Title level={3} style={{ color: '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive' }}>
          My Inks
        </Title>
      </div>
      <div className="mt-8 w-full max-w-4xl mx-auto space-y-4">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <PostedCard key={post.id} card={post} openModal={openModal} handleReaction={handleReaction} />
          ))
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default MyInks;
