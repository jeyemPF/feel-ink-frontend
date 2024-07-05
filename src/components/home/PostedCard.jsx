import React from 'react';
import { HeartOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { formatTimestamp } from '../../utils/dateUtils';

const PostedCard = ({ card, openModal, handleReaction }) => {
  const handleIconClick = (e) => {
    e.stopPropagation();
    openModal(card);
  };

  const textColor = (color) => (color === '#9575CD' || color === '#B39DDB' ? '#FAFAFA' : 'inherit');
  const iconColor = (color, isHeartClicked) => (isHeartClicked ? 'violet' : (color === '#9575CD' ? '#FFFFFF' : '#1e1d1f'));

  const UserInfo = ({ username, avatar, color }) => (
    username === 'Anonymous' ? (
      <p className="text-sm font-medium	" style={{ color: textColor(color) }}>
        {username}
      </p>
    ) : (
      <div className="flex items-center">
        <img className="w-6 h-6 rounded-full mr-2" src={avatar} alt="Avatar" />
        <p className="text-sm font-medium	" style={{ color: textColor(color) }}>
          {username}
        </p>
      </div>
    )
  );

  return (
    <div key={card.id} className="p-4 rounded bg-white shadow" style={{ backgroundColor: card.color }}>
      <div className="flex items-center justify-between">
        <UserInfo username={card.username} avatar={card.avatar} color={card.color} />
        <p className="text-xs" style={{ color: textColor(card.color) }}>
          {formatTimestamp(card.timestamp)}
        </p>
      </div>
      <p
        className="font-extralight pt-5 text-sm overflow-hidden webkit-box webkit-box-orient-vertical webkit-line-clamp-2"
        style={{
          color: textColor(card.color),
        }}
      >
        {card.content}
      </p>
      <div className="flex items-center mt-2 justify-end w-full">
        <ArrowsAltOutlined style={{ marginRight: '8px', cursor: 'pointer' }} onClick={handleIconClick} />
        <div className="flex flex-row gap-1 items-center">
          <HeartOutlined
            style={{ color: iconColor(card.color, card.isHeartClicked), cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              handleReaction(card.id, 'heart');
            }}
          />
          <p className="text-xs" style={{ color: textColor(card.color) }}>
            {card.reactions.heart}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostedCard;
