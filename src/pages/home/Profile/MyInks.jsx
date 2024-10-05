import React, { useContext, useState } from 'react';
import { Typography, Card, Popover, Modal, Input, Button } from 'antd';
import { HeartOutlined, EditOutlined } from '@ant-design/icons';
import { AppContext } from '../../../context/AppContext';

const { Title } = Typography;
const { TextArea } = Input;

const MyInks = () => {
  const { posts, postLoading, postError, updatePost } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  const openModal = (post) => {
    setCurrentPost(post);
    setEditedContent(post.content);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentPost(null);
  };

  const handleSave = () => {
    if (currentPost) {
      updatePost(currentPost.id, editedContent);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="mt-4 p-4 rounded w-full max-w-4xl mx-auto pt-30 md:pt-1 md:mt-4">
      <div className="dark:bg-[#292b2d] rounded p-8">
        <div>
          <p className="text-xl font-bold text-violet-700">My Inks</p>
        </div>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card
                key={post.id}
                hoverable
                className="shadow-md rounded-lg bg-white dark:bg-[#333] dark:text-[#D3D3D3] transition-all duration-300 border border-transparent"
              >
                <div className="flex justify-between items-center">
                  <p>{post.content}</p>
                  <EditOutlined
                    onClick={() => openModal(post)}
                    className="text-gray-600 dark:text-gray-300 cursor-pointer"
                  />
                </div>
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

      {/* Customized Modal */}
      <Modal
        title={<span style={{ fontWeight: 'bold', fontSize: '18px', color: '#5B21B6' }}>Edit Your Post</span>}
        open={isModalOpen}
        onCancel={handleCancel}
        width={600} // Change the width of the modal
        bodyStyle={{
          backgroundColor: '#292b2d', // Dark background for dark mode
          color: '#fff', // Text color in the modal
        }}
        footer={[
          <Button key="cancel" style={{ background: '#f5f5f5', color: '#333' }} onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" style={{ background: '#5B21B6', borderColor: '#5B21B6' }} onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <TextArea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={4}
          style={{
            backgroundColor: '#333',
            color: '#fff',
            borderColor: '#5B21B6',
          }}
          placeholder="Edit your post..."
        />
      </Modal>
    </div>
  );
};

export default MyInks;
