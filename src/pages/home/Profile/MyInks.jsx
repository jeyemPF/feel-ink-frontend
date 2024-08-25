import React, { useContext } from 'react';
import { Typography, Spin, Card, Popover, Skeleton } from 'antd';
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
    <div className="mt-8 p-4 rounded w-full max-w-6xl mx-auto pt-40 md:pt-14">
      <div className="bg-red py-10">
        <Title level={3} style={{ color: '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive' }}>
          My Inks
        </Title>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              hoverable
              className="shadow-md rounded-lg"
              onClick={() => openModal(post.id)}
              cover={<img alt="example" src={post.cover_image} />}
            >
              <Skeleton loading={postLoading} active>
                <p>{post.content}</p>
                <div className="flex justify-between items-center mt-2">
                  <Popover content="React to this post">
                    <HeartOutlined onClick={() => handleReaction(post.id, 'like')} /> {post.reactions_count}
                  </Popover>
                </div>
              </Skeleton>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default MyInks;
