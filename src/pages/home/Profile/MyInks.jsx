import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const MyInks = () => (
  <div className="mt-8 p-4 rounded w-full max-w-4xl mx-auto pt-40 md:pt-14">
    <div className="bg-red py-10">
      <Title level={3} style={{ color: '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive' }}>
        My Inks
      </Title>
    </div>
    <div className="mt-8 w-full max-w-4xl mx-auto"></div>
  </div>
);

export default MyInks;
