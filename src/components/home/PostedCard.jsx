import React from 'react';
import { HeartOutlined } from '@ant-design/icons';
import { formatTimestamp } from '../../utils/dateUtils';

const PostedCard = ({ card, openModal, handleReaction }) => {
  return (
    <div
      key={card.id}
      className="p-4 rounded bg-white shadow cursor-pointer"
      style={{ backgroundColor: card.color }}
      onClick={() => openModal(card)}
    >
      <div className="flex items-center justify-between">
        {card.username === 'Anonymous' ? (
          <p className="text-sm text-white">{card.username}</p>
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
      <p className="overflow-hidden overflow-ellipsis pt-2" style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
        {card.content}
      </p>
      <div className="flex items-center mt-2 justify-end">
        <div className="flex items-center">
          <HeartOutlined
            style={{ color: card.isHeartClicked ? 'violet' : '#1e1d1f', marginRight: '5px', marginTop: '2px', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              handleReaction(card.id, 'heart');
            }}
          />
          <p className="text-sm" style={{ color: card.color === '#9575CD' || card.color === '#f5f5f5' ? '#FAFAFA' : 'inherit' }}>
            {card.reactions.heart}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostedCard;
