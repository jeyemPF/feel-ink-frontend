import React from 'react';
import bump from '../../assets/logo/bump.png';

const EmptyState = () => {
  return (
    <div className="flex items-center flex-col mt-4">
      <img src={bump} alt="Bump Logo" className="w-40 h-40 " />
      <p className='text-gray-400'>No stories found</p>
    </div>
  );
};

export default EmptyState;
