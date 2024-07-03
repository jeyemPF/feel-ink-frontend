import React from 'react';
import PropTypes from 'prop-types';

const CardPostedModal = ({ isOpen, onClose, card }) => {
  if (!isOpen || !card) return null;

  const { avatar, username, content } = card;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg"
        onClick={(e) => e.stopPropagation()} // Prevents click inside CardPostedModal from closing it
      >
        <div className="flex items-center mb-4">
          {avatar && (
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={avatar}
              alt="Avatar"
            />
          )}
          {username && <p className="text-lg font-semibold">{username}</p>}
        </div>
        <p className="mb-4">{content}</p>
        <button
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

CardPostedModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  card: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string,
    content: PropTypes.string.isRequired,
  }),
};

export default CardPostedModal;
