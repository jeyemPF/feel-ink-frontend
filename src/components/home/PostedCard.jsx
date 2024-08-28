import React, { useState } from 'react';
import { HeartOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { formatTimestamp } from '../../utils/dateUtils';

const PostedCard = ({ card, openModal, handleReaction }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(card.is_heart_clicked || false);

  const handleIconClick = (e) => {
    e.stopPropagation();
    openModal(card);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    handleReaction(card.id, 'heart');
    setIsHeartClicked(!isHeartClicked);
  };

  const textColor = (color) => {
    if (document.documentElement.classList.contains('dark')) {
      return '#E4E6EB'; // Match content color in dark mode
    }
    switch (color) {
      case '#FFFFFF':
        return '#374151'; // Dark text for light background
      case '#D1C4E9':
        return '#4B5563';
      case '#9575CD':
        return '#FAFAFA';
      default:
        return '#374151'; // Default dark text for other colors
    }
  };

  const iconColor = (color, isHeartClicked) => {
    if (document.documentElement.classList.contains('dark')) {
      return isHeartClicked ? '#E4E6EB' : '#E4E6EB'; // Match content color in dark mode
    }
    switch (color) {
      case '#FFFFFF':
        return isHeartClicked ? '#8B5CF6' : '#374151';
      case '#D1C4E9':
        return isHeartClicked ? '#8B5CF6' : '#4B5563';
      case '#9575CD':
        return isHeartClicked ? '#8B5CF6' : '#FAFAFA';
      default:
        return 'inherit';
    }
  };

  const UserInfo = ({ name, avatar, color }) => (
    card.is_anonymous ? (
      <p className="text-sm font-medium dark:bg-[#242526]" style={{ color: textColor(color) }}>
        Anonymous
      </p>
    ) : (
      <div className="flex items-center">
        <img
          className="w-6 h-6 rounded-full mr-2 select-none"
          src={avatar || 'default-avatar-url'}
          alt="Avatar"
        />
        <p className="text-sm font-medium select-none dark:bg-[#242526]" style={{ color: textColor(color) }}>
          {name}
        </p>
      </div>
    )
  );

  return (
    <div key={card.id} className="p-4 rounded bg-white dark:bg-[#242526] shadow" style={{ backgroundColor: card.color }}>
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
      <p className="font-light pt-5 text-sm overflow-hidden webkit-box webkit-box-orient-vertical webkit-line-clamp-2 dark:text-[#E4E6EB]">
        {card.content}
      </p>
      <div className="flex items-center mt-2 justify-end w-full">
        <Popover content="Expand the ink" placement="top">
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
        </Popover>
        <div className="flex flex-row gap-1 items-center">
          <Popover content="React to this ink" placement="top">
            <HeartOutlined
              style={{ 
                color: iconColor(card.color, isHeartClicked), 
                cursor: 'pointer' 
              }}
              onClick={handleHeartClick}
              onMouseOver={(e) => e.target.style.color = '#6B7280'} 
              onMouseOut={(e) => e.target.style.color = iconColor(card.color, isHeartClicked)}
            />
          </Popover>
          <p className="text-sm" style={{ color: textColor(card.color) }}>
            {card.reactions_count || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostedCard;
