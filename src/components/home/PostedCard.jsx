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
    setIsHeartClicked(prevState => !prevState);
};

  const textColor = (color) => {
    if (document.documentElement.classList.contains('dark')) {
      return '#E4E6EB'; // Light text for dark mode
    }
    return color === '#FFFFFF' ? '#374151' : '#333333'; // Dark text for light backgrounds
  };

  const iconColor = (isHeartClicked) => {
    return isHeartClicked
        ? document.documentElement.classList.contains('dark')
            ? '#E4E6EB' // Active icon color in dark mode
            : '#8B5CF6' // Active icon color in light mode
        : '#374151'; // Default icon color
};


  const UserInfo = ({ name, avatar, color }) => (
    card.is_anonymous ? (
      <p className="text-sm font-medium dark:text-[#E4E6EB]" style={{ color: textColor(color) }}>
        Anonymous
      </p>
    ) : (
      <div className="flex items-center">
        <img
          className="w-6 h-6 rounded-full mr-2 select-none"
          src={avatar || 'default-avatar-url'}
          alt="Avatar"
        />
        <p className="text-sm font-medium select-none dark:text-[#E4E6EB]" style={{ color: textColor(color) }}>
          {name}
        </p>
      </div>
    )
  );

  return (
    <div key={card.id} className="p-4 rounded shadow bg-white dark:bg-[#242526]" style={{ backgroundColor: card.color }}>
      <div className="flex items-center justify-between">
        <UserInfo 
          name={card.user?.name || 'Anonymous'} 
          avatar={card.user?.avatar} 
          color={card.color} 
        />
        <p className="text-xs dark:text-[#E4E6EB]" style={{ color: textColor(card.color) }}>
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
                color: iconColor(isHeartClicked), 
                cursor: 'pointer' 
              }}
              onClick={handleHeartClick}
              onMouseOver={(e) => e.target.style.color = '#6B7280'} 
              onMouseOut={(e) => e.target.style.color = iconColor(isHeartClicked)}
            />
          </Popover>
          <p className="text-sm dark:text-[#E4E6EB]" style={{ color: textColor(card.color) }}>
            {card.reactions_count || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostedCard;
