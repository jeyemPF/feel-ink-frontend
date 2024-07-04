import React from 'react';
import { Typography } from 'antd';
import logo from '../../assets/logo/logos.png';

const { Title } = Typography;

const colorOptions = ['#FFFFFF', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD'];

const CardForm = ({ formState, handleFormChange, postCard }) => {
  const { newCardContent, selectedColor, postMode } = formState;

  return (
    <div className="w-full md:w-1/2 p-4 mb-4 md:mb-0">
      <div className="p-4 rounded relative bg-white shadow">
        <div className="flex items-center">
          <img src={logo} alt="Feelink Logo" className="w-5 h-5" />
          <Title level={5} style={{ color: '#5B21B6' }} className="font-bold justify-start text-justify pt-1">
            Compose Your Ink
          </Title>
        </div>

        <textarea
          className="w-full h-18 border-2 rounded p-2 focus:outline-none"
          value={newCardContent}
          onChange={(e) => handleFormChange('newCardContent', e.target.value)}
          placeholder="Write your thoughts..."
          style={{ border: `2px solid ${selectedColor !== '#FFFFFF' ? selectedColor : '#c0c0c0'}` }}
        />

        <div className="flex flex-col md:flex-column items-center mt-2">
          <div className="flex flex-col md:flex-row sm:flex-row mb-2 w-full">
            <select
              className="mt-2 md:mt-0 md:ml-1 sm:mt-0 sm:ml-2 bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none w-full md:w-full"
              value={selectedColor}
              onChange={(e) => handleFormChange('selectedColor', e.target.value)}
            >
              {colorOptions.map((color, index) => (
                <option key={index} value={color} style={{ backgroundColor: color }}>
                  {color}
                </option>
              ))}
            </select>
            <select
              className="mt-2 md:mt-0 md:mr-1 sm:mt-0 sm:ml-2 bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none w-full"
              value={postMode}
              onChange={(e) => handleFormChange('postMode', e.target.value)}
            >
              <option value="reveal">Reveal Me</option>
              <option value="anonymous">Anonymous</option>
            </select>
          </div>

          <button
            className="mt-2 md:mt-0 md:ml-2 bg-violet-800 text-white py-1 px-3 rounded hover:bg-violet-600 focus:outline-none w-full"
            onClick={postCard}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
