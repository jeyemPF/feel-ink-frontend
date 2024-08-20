import React from 'react';
import { HeartOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { formatTimestamp } from '../../utils/dateUtils';

const PostedCard = ({ card, openModal, handleReaction }) => {
  const handleIconClick = (e) => {
    e.stopPropagation();
    openModal(card);
  };

  const textColor = (color) => {
    switch (color) {
      case '#FFFFFF':
        return '#374151'; // Dark gray for white background
      case '#D1C4E9':
        return '#4B5563'; // Medium gray for light purple background
      case '#9575CD':
        return '#FAFAFA'; // Very light gray for purple background
      default:
        return 'inherit';
    }
  };

  const iconColor = (color, isHeartClicked) => {
    switch (color) {
      case '#FFFFFF':
        return isHeartClicked ? '#8B5CF6' : '#374151'; // Dark gray for white background
      case '#D1C4E9':
        return isHeartClicked ? '#8B5CF6' : '#4B5563'; // Medium gray for light purple background
      case '#9575CD':
        return isHeartClicked ? '#8B5CF6' : '#FAFAFA'; // Very light gray for purple background
      default:
        return 'inherit';
    }
  };

  const UserInfo = ({ name, avatar, color }) => (
    card.is_anonymous ? (
      <p className="text-sm font-medium" style={{ color: textColor(color) }}>
        Anonymous
      </p>
    ) : (
      <div className="flex items-center">
        <img
          className="w-6 h-6 rounded-full mr-2 select-none"
          src={avatar || 'default-avatar-url'}
          alt="Avatar"
        />
        <p className="text-sm font-medium select-none" style={{ color: textColor(color) }}>
          {name}
        </p>
      </div>
    )
  );

  return (
    <div key={card.id} className="p-4 rounded bg-white shadow" style={{ backgroundColor: card.color }}>
      <div className="flex items-center justify-between">
        <UserInfo 
          name={card.user?.name || 'Anonymous'} 
          avatar={card.user?.avatar} 
          color={card.color} 
        />
        <p className="text-xs" style={{ color: textColor(card.color) }}>
          {formatTimestamp(card.timestamp)}
        </p>
      </div>
      <p
        className="font-light pt-5 text-sm overflow-hidden webkit-box webkit-box-orient-vertical webkit-line-clamp-2"
        style={{ color: textColor(card.color) }}
      >
        {card.content}
      </p>
      <div className="flex items-center mt-2 justify-end w-full">
        <ArrowsAltOutlined 
          style={{ 
            marginRight: '8px', 
            cursor: 'pointer', 
            color: textColor(card.color) 
          }} 
          onClick={handleIconClick} 
          onMouseOver={(e) => e.target.style.color = '#6B7280'} 
          onMouseOut={(e) => e.target.style.color = textColor(card.color)}
        />
        <div className="flex flex-row gap-1 items-center">
          <HeartOutlined
            style={{ 
              color: iconColor(card.color, card.isHeartClicked), 
              cursor: 'pointer' 
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleReaction(card.id, 'heart');
            }}
            onMouseOver={(e) => e.target.style.color = '#6B7280'} 
            onMouseOut={(e) => e.target.style.color = iconColor(card.color, card.isHeartClicked)}
          />
          <p className="text-sm" style={{ color: textColor(card.color) }}>
            {card.reactions?.heart?.count || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostedCard;
