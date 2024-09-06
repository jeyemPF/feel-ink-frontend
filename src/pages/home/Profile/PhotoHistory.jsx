import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const PhotoHistory = () => {
  // Array of 9 placeholder images (using a dummy URL service)
  const dummyPhotos = Array(9).fill("https://picsum.photos/200");

  return (
    <div className="mt-9 rounded px-4 md:px-0  ">
         <div className='dark:bg-[#292b2d] rounded p-8 md:p-8 flex flex-col gap-1 '>
        <div className="">
          <Title
            level={4}
            className=""
            style={{ color: '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive' }}
          >
            Photo History
          </Title>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2 ">
          {dummyPhotos.map((photoUrl, index) => (
            <div key={index} className="relative w-full p-16 overflow-hidden rounded-lg shadow-md">
              <img
                src={photoUrl}
                alt={`Dummy Photo ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoHistory;
