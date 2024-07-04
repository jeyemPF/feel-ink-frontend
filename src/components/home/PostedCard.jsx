import React from 'react';
import { HeartOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { formatTimestamp } from '../../utils/dateUtils';

const PostedCard = ({ card, openModal, handleReaction }) => {
  const handleIconClick = (e) => {
    e.stopPropagation(); 
    openModal(card);
  };

  return (
    <div
      key={card.id}
      className="p-4 rounded bg-white shadow"
      style={{ backgroundColor: card.color }}
    >
      <div className="flex items-center justify-between">
        {card.username === 'Anonymous' ? (
          <p className="text-sm" style={{ color: card.color === '#9575CD' || card.color === '#B39DDB' ? '#FAFAFA' : 'inherit' }}>
            {card.username}
          </p>
        ) : (
          <div className="flex items-center">
            <img className="w-6 h-6 rounded-full mr-2" src={card.avatar} alt="Avatar" />
            <p className="text-sm" style={{ color: card.color === '#9575CD' || card.color === '#B39DDB' ? '#FAFAFA' : 'inherit' }}>
              {card.username}
            </p>
          </div>
        )}
        <p className="text-xs" style={{ color: card.color === '#9575CD' || card.color === '#B39DDB' ? '#f5f5f5' : 'inherit' }}>
          {formatTimestamp(card.timestamp)}
        </p>
      </div>
      <div className=''>
      <p className="overflow-hidden overflow-ellipsis pt-2" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
        {card.content}
      </p>
      </div>
     
      <div className="flex items-center mt-2 justify-end">
        <div className="flex items-center justify-between w-full ">
        <div className=''>
        <ArrowsAltOutlined
            style={{ marginRight: '8px', cursor: 'pointer' }}
            onClick={handleIconClick} // Clicking the icon opens the lmoda
          />
          </div>

        <div className='flex flex-row gap-1'>
          <HeartOutlined
            style={{
              color: card.isHeartClicked ? 'violet' : (card.color === '#9575CD' ? '#FFFFFF' : '#1e1d1f'),
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking on the heart icon
              handleReaction(card.id, 'heart');
            }}
          />
          <p className="text-sm" style={{ color: card.color === '#9575CD' || card.color === '#f5f5f5' ? '#FAFAFA' : 'inherit' }}>
            {card.reactions.heart}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostedCard;
