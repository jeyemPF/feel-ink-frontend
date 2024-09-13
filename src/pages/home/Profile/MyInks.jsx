import React, { useContext, useState } from 'react';
import { Typography, Card, Popover, Modal, Input, Button } from 'antd';
import { HeartOutlined, EditOutlined } from '@ant-design/icons';
import { AppContext } from '../../../context/AppContext';

const { Title } = Typography;
const { TextArea } = Input;

const MyInks = () => {
  const { posts, postLoading, postError, updatePost } = useContext(AppContext); // Assuming updatePost is provided for updating the post
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
    // Call updatePost function to save the edited content (assuming updatePost is available from context)
    if (currentPost) {
      updatePost(currentPost.id, editedContent);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="mt-4 p-4 rounded w-full max-w-4xl mx-auto pt-30 md:pt-1 md:mt-4">
      <div className="dark:bg-[#292b2d] rounded p-8">
        <div>
          <Title level={4} style={{ color: '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive' }}>
            My Inks
          </Title>
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

      {/* Modal for editing post */}
      <Modal
        title="Edit Post"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <TextArea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={4}
          placeholder="Edit your post..."
        />
      </Modal>
    </div>
  );
};

export default MyInks;
