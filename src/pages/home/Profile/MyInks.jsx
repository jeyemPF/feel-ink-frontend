import React, { useContext } from 'react';
import { Typography, Spin, Card, Popover, Skeleton } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { AppContext } from '../../../context/AppContext';


const { Title } = Typography;

const MyInks = () => {
  const { posts, postLoading, postError } = useContext(AppContext);

  const openModal = (id) => {
    console.log(`Open modal for post ${id}`);
  };

 


  return (
    <div className="mt-8 p-4 rounded w-full max-w-4xl mx-auto pt-30 md:pt-1  ">
    <div className='dark:bg-[#292b2d] rounded p-8   '>
      <div className=" ">
        <Title level={3} style={{ color: '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive' }}>
          My Inks
        </Title>
      </div>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card
              key={post.id}
              hoverable
              className="shadow-md rounded-lg bg-white dark:bg-[#333] dark:text-[#D3D3D3]
                        transition-all duration-300 border border-transparent 
                        dark:border-violet-800"
              onClick={() => openModal(post.id)}
            >

            
                <p>{post.content}</p>
                <div className="flex justify-between items-center mt-2">
                  <Popover content="Reactions">
                    <HeartOutlined className="text-violet-800 dark:text-violet-500" /> {post.reactions_count}
                  </Popover>
                </div>
              
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No posts found.</p>
        )}
      </div>
      </div>
    </div>
  );
};

export default MyInks;
