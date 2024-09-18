import React from 'react';
import PropTypes from 'prop-types';
import { formatTimestamp } from '../../utils/dateUtils';
import { ShrinkOutlined } from '@ant-design/icons';

const CardPostedModal = ({ isOpen, onClose, card }) => {
  if (!isOpen || !card) return null;

  const { content, color, timestamp, user, is_anonymous } = card;
  const { avatar, name: username } = user || {};

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-[#242526] p-4 rounded-lg shadow-lg w-full h-3/4 lg:h-3/4 lg:w-1/3"
          style={{ maxWidth: '80vw', color: '#333333' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-row">
                {!is_anonymous && avatar && (
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={avatar}
                    alt="Avatar"
                  />
                )}
                <div className="flex flex-col justify-center">
                  {card.is_anonymous ? (
                    <p className="text-sm font-semibold dark:text-gray-200">Anonymous</p>
                  ) : (
                    <p className="text-sm font-semibold dark:text-gray-200">{username}</p>
                  )}
                  <p className="text-xs mb-4 dark:text-gray-400">{formatTimestamp(timestamp)}</p>
                </div>
              </div>
            </div>
            <div>
              <ShrinkOutlined
                className="text-lg font-bold dark:text-gray-200 cursor-pointer"
                onClick={onClose}
              />
            </div>
          </div>

          <div className="overflow-auto pl-2" style={{ height: 'calc(100% - 64px)' }}>
            <p className="pb-10 text-sm dark:text-gray-300" style={{ wordBreak: 'break-word' }}>{content}</p>
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
