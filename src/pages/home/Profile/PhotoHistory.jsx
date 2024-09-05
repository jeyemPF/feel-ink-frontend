import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const PhotoHistory = () => {
  // Array of 9 placeholder images (using a dummy URL service)
  const dummyPhotos = Array(9).fill("https://picsum.photos/200");

  return (
    <div className="mt-5 p-4 rounded w-full max-w-4xl mx-auto">
      <div className="bg-[#292b2d] rounded p-8">
        <Title level={3} className="dark:text-purple-700 text-purple-700 font-bold" style={{ fontFamily: 'Lobster, cursive' }}>
          Photo History
        </Title>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {dummyPhotos.map((photoUrl, index) => (
            <div key={index} className="relative w-full pt-[100%] overflow-hidden rounded">
              <img
                src={photoUrl}
                alt={`Dummy Photo ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoHistory;
