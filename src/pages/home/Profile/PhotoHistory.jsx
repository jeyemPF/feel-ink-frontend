import React, { useState } from 'react';
import { Typography, Button } from 'antd';

const { Title } = Typography;

const PhotoHistory = ({ photoHistory }) => {
  // Ensure photoHistory is an array
  const photos = Array.isArray(photoHistory) ? photoHistory : [];
  
  // State to manage visibility of additional photos
  const [showMore, setShowMore] = useState(false);
  
  // Handle click to toggle visibility
  const handleToggle = () => {
    setShowMore(prev => !prev);
  };

  // Split photos into visible and hidden arrays
  const visiblePhotos = photos.slice(0, 9);
  const hiddenPhotos = photos.slice(9);

  return (
    <div className="mt-5 mx-4 md:px-2 max-w-screen-lg md:max-w-screen-sm  p-4 rounded dark:bg-[#292b2d] bg-white">
      <div className="rounded p-2 md:p-4 px-5 py-1 md:py-1   flex flex-col gap-2 md:px-5 dark:bg-[#292b2d] bg-white">
        {/* Flex container for title and button */}
        <div className="flex justify-between items-center   ">
          {/* <Title
            level={4}
            style={{ color: '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive', fontSize: '1.25rem' }}
            className="dark:text-white"
          >
            Photo History
          </Title> */}
          <p className='text-xl font-bold text-violet-700'>Photo History</p>
          {hiddenPhotos.length > 0 && (
            <button
              onClick={handleToggle}
              className="  text-violet-800 text-sm py-1 px-4 md:py-2 md:px-3 rounded min-w-min hover:bg-white-800 hover:text-violet-600  dark:text-[#D3D3D3] dark:border-[#D3D3D3] dark:hover:text-white"
            >
              {showMore ? 'Show Less' : 'See More'}
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2 mb-1">
          {photos.length > 0 ? (
            <>
              {(showMore ? photos : visiblePhotos).map((photo, index) => (
                <div key={photo.id} className="relative overflow-hidden rounded-lg shadow-md dark:bg-[#292b2d] bg-white">
                  <img
                    src={photo.photo_url}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '1 / 1' }}
                  />
                </div>
              ))}
            </>
          ) : (
            <p className="text-center dark:text-white">No photos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoHistory;
