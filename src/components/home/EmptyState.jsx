import React from 'react';
import bump from '../../assets/logo/bump.png';

const EmptyState = () => {
  return (
    <div className="flex items-center flex-col text-gray-500 mt-4">
      <img src={bump} alt="Bump Logo" className="w-40 h-40" />
      <p>No stories found</p>
    </div>
  );
};

export default EmptyState;
