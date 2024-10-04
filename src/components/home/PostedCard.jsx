import React, { useState, useEffect } from 'react';
import { HeartOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { formatTimestamp } from '../../utils/dateUtils';

const PostedCard = ({ card, openModal, handleReaction }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(card.is_heart_clicked || false);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const darkModeObserver = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    darkModeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => darkModeObserver.disconnect();
  }, []);

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
    return isDarkMode ? '#D3D3D3' : (color === '#FFFFFF' ? '#374151' : '#333333');
  };

  const iconColor = (isHeartClicked) => {
    return isHeartClicked ? (isDarkMode ? '#D3D3D3' : '#8B5CF6') : '#374151';
  };

  const UserInfo = ({ name, avatar, color }) => (
    card.is_anonymous ? (
      <p className="text-sm font-thin dark:text-[#D3D3D3] text-[#333333] " style={{ color: textColor(color) }}>
        Anonymous
      </p>
    ) : (
      <div className="flex items-center">
        <img
          className="w-6 h-6 rounded-full mr-2 select-none"
          src={avatar || 'default-avatar-url'}
          alt="Avatar"
        />
        <p className="text-sm font-thin select-none dark:text-[#D3D3D3] text-[#696969]" style={{ color: textColor(color) }}>
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
        <p className="text-xs dark:text-[#D3D3D3]] font-normal text-[#696969]" style={{ color: textColor(card.color) }}>
          {formatTimestamp(card.timestamp)}
        </p>
      </div>
      <p className="font-normal pt-5 text-sm overflow-hidden webkit-box webkit-box-orient-vertical webkit-line-clamp-2 dark:text-[#D3D3D3] text-[#333333]">
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
          <p className="text-sm dark:text-[#D3D3D3]" style={{ color: textColor(card.color) }}>
            {card.reactions_count || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostedCard;
