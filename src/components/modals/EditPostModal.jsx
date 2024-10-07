import React, { useState } from 'react';
import { Typography } from 'antd';
import { ShrinkOutlined } from '@ant-design/icons';

const { Title } = Typography;

const EditPostModal = ({ postContent, onClose, onSave }) => {
  const [editedContent, setEditedContent] = useState(postContent);

  const handleSave = () => {
    onSave(editedContent); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative dark:bg-[#292b2d] bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <Title level={3} style={{ color: '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive', textAlign: 'center' }}>
            Edit Post
          </Title>
          <ShrinkOutlined className="text-lg text-gray-500 hover:text-gray-800 cursor-pointer" onClick={onClose} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="postContent">Content</label>
          <textarea
            id="postContent"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none placeholder-gray-400 dark:bg-[#3A3B3C] dark:placeholder-gray-500 text-sm"
            placeholder="Edit your post content"
            rows={4}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-sm w-full focus:outline-none"
            onClick={handleSave}
            style={{ backgroundColor: '#5B21B6', transition: 'background-color 0.3s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7C3AED'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#5B21B6'}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPostModal;
