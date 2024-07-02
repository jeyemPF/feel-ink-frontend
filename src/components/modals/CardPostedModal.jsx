import React from 'react';

const CardPostedModal = ({ isOpen, onClose, card }) => {
  if (!isOpen || !card) return null;

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
          {card.avatar && (
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={card.avatar}
              alt="Avatar"
            />
          )}
          <p className="text-lg font-semibold">{card.username}</p>
        </div>
        <p className="mb-4">{card.content}</p>
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

export default CardPostedModal;
