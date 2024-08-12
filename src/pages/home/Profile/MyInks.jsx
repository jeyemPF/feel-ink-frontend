import React, { useContext } from 'react';
import { Typography, Spin, Button } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { AppContext } from '../../../context/AppContext';

const { Title } = Typography;

const MyInks = () => {
  const { posts, postLoading, postError } = useContext(AppContext);

  const handleReaction = (id, reaction) => {
    console.log(`Reacted to post ${id} with ${reaction}`);
  };

  const openModal = (id) => {
    console.log(`Open modal for post ${id}`);
  };

  if (postLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (postError) {
    return (
      <div className="text-center text-red-500">
        <p>{postError}</p>
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
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="p-4 bg-white shadow-md rounded-lg">
              <p>{post.content}</p>
              <div className="flex justify-between items-center mt-2">
                <Button onClick={() => openModal(post.id)}>Open Modal</Button>
                <Button onClick={() => handleReaction(post.id, 'like')}>
                  <HeartOutlined /> {post.reactions_count}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default MyInks;
