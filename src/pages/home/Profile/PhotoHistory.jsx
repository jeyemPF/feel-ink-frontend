import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const PhotoHistory = ({ photoHistory }) => {
  // Ensure photoHistory is an array
  const photos = Array.isArray(photoHistory) ? photoHistory : [];

  return (
    <div className="mt-5 md:px-2 max-w-screen-lg  md:max-w-screen-sm mx-auto  p-4 rounded    "> 
      <div className="dark:bg-[#292b2d] rounded p-2 md:p-4  px-5 py-5 md:py-7 flex flex-col gap-2 md:px-10">
        <Title
          level={4}
          style={{ color: '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive', fontSize: '1.25rem' }} 
        >
          Photo History
        </Title>
        <div className="grid grid-cols-3 gap-2 mb-1 "> 
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <div key={photo.id} className="relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={photo.photo_url}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: '1 / 1' }}
                />
              </div>
            ))
          ) : (
            <p>No photos available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoHistory;
