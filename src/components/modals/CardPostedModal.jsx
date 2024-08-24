import React from 'react';
import PropTypes from 'prop-types';
import { formatTimestamp } from '../../utils/dateUtils';
import { ShrinkOutlined, ShareAltOutlined, HeartOutlined } from '@ant-design/icons';

const CardPostedModal = ({ isOpen, onClose, card }) => {
  if (!isOpen || !card) return null;

  // Destructure card object, including nested user object
  const { content, color, timestamp, user, reactions_count } = card;
  const { avatar, name: username } = user || {};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="bg-white p-4 rounded-lg shadow-lg w-full h-3/4 lg:h-3/4 lg:w-1/3"
          style={{ maxWidth: '80vw', backgroundColor: color || 'white', color: '#333333' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-row">
                {avatar && (
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={avatar}
                    alt="Avatar"
                  />
                )}
                <div className="flex flex-col justify-center align-center">
                  {username && <p className="text-sm md:text-sm sm:text-sm font-semibold">{username}</p>}
                  <p className="text-xs md:text-xs sm:text-sm text-gray-500 mb-4">{formatTimestamp(timestamp)}</p>
                </div>
              </div>
            </div>
            <div>
              <ShrinkOutlined
                className="text-lg font-bold text-gray-500 hover:text-gray-800 focus:outline-none pb-6"
                onClick={onClose}
              />
            </div>
          </div>

          <div className="overflow-auto pl-2" style={{ height: 'calc(100% - 64px)' }}>
            <p className="pb-10 text-sm" style={{ wordBreak: 'prewrap' }}>{content}</p>
          </div>

          {/* Icons Section */}
          <div className="flex justify-end gap-3 items-center  ">
          <div className="flex items-center gap-1">
              <HeartOutlined className="text-lg text-violet-500 cursor-pointer" />
              {reactions_count > 0 && (
                <span className="text-sm text-violet-600">{reactions_count}</span>
              )}
            </div>
            {/* <ShareAltOutlined className="text-lg text-gray-500 hover:text-gray-800 cursor-pointer" /> */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

CardPostedModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  card: PropTypes.shape({
    content: PropTypes.string.isRequired,
    color: PropTypes.string,
    timestamp: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
    }),
    reactions_count: PropTypes.number.isRequired,
  }),
};

export default CardPostedModal; 
