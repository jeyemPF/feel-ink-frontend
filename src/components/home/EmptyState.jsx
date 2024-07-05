import React from 'react';
import bump from '../../assets/logo/bump.png';
import { Typography } from 'antd';

const { Text } = Typography;


const EmptyState = () => {
  return (
    <div className="flex items-center flex-col mt-4">
      <img src={bump} alt="Bump Logo" className="w-40 h-40 " />
      <Text level={5} style={{ color: "#9ca3af",   fontFamily: 'Lobster, cursive' }} className="justify-start text-justify ">
           No Inks found
      </Text>    </div>
  );
};

export default EmptyState;
