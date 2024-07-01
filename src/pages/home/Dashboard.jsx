import React, { useState } from 'react';
import Header from '../../components/Header.jsx';
import { HeartOutlined } from '@ant-design/icons'; // Import HeartOutlined icon from Ant Design

const Dashboard = () => {
  const [postedCards, setPostedCards] = useState([]);
  const [newCardContent, setNewCardContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // Default color
  const [postMode, setPostMode] = useState('reveal'); // Default post mode

  // Function to handle content change of the new card
  const handleNewCardContentChange = (e) => {
    setNewCardContent(e.target.value);
  };

  // Function to handle color selection from dropdown
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  // Function to handle post mode selection
  const handlePostModeChange = (mode) => {
    setPostMode(mode);
  };

  // Function to add a new card to the posted cards
  const postCard = () => {
    if (newCardContent.trim() !== '') {
      const username = postMode === 'reveal' ? 'User@example.com' : 'Anonymous';
      const avatar = postMode === 'reveal'
        ? 'http://res.cloudinary.com/dihmqs39z/image/upload/v1717393349/ll3mgk5u2p1cvtzrjwyl.jpg'
        : null;
      
      const newCard = {
        id: postedCards.length + 1,
        content: newCardContent,
        color: selectedColor, // Assign selected color to the card
        username: username,
        avatar: avatar,
        reactions: { heart: 0 }, // Initialize reactions object
        isHeartClicked: false, // Track whether heart icon is clicked
      };

      setPostedCards([...postedCards, newCard]);
      setNewCardContent('');
      // Additional logic for posting (e.g., API call)
      console.log('Posting:', newCardContent);
    }
  };

  // Function to handle reaction (increment heart count and toggle heart click state)
  const handleReaction = (cardId, reactionType) => {
    const updatedCards = postedCards.map(card => {
      if (card.id === cardId) {
        return {
          ...card,
          reactions: {
            ...card.reactions,
            [reactionType]: card.reactions[reactionType] + 1,
          },
          isHeartClicked: !card.isHeartClicked, // Toggle heart click state
        };
      }
      return card;
    });
    setPostedCards(updatedCards);
  };

  // Color options that fit within a violet theme
  const colorOptions = ['#FFFFFF', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD'];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header addCard={postCard} disableAddButton={false} />
      <div className="p-4 flex flex-col md:flex-row">
        {/* Writing section */}
        <div className="w-full md:w-1/3 p-4 mb-4 md:mb-0">
          <div className="p-4 rounded relative bg-white shadow">
            <textarea
              className="w-full h-32 border-2 border-gray-300 rounded p-2 focus:outline-none"
              value={newCardContent}
              onChange={handleNewCardContentChange}
              placeholder="What's on your mind..."
              style={{ backgroundColor: selectedColor }} // Apply selected color to textarea background
            />
            <div className="flex items-center mt-2">
              {/* Display color selection dropdown */}
              <select
                className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none"
                value={selectedColor}
                onChange={handleColorChange}
              >
                {colorOptions.map((color, index) => (
                  <option key={index} value={color} style={{ backgroundColor: color }}>
                    {color}
                  </option>
                ))}
              </select>
              {/* Display post mode selection */}
              <select
                className="ml-2 bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none"
                value={postMode}
                onChange={(e) => handlePostModeChange(e.target.value)}
              >
                <option value="reveal">Reveal Me</option>
                <option value="anonymous">Anonymous</option>
              </select>
              <button
                className="ml-2 bg-violet-800 text-white py-1 px-3 rounded hover:bg-violet-600 focus:outline-none"
                onClick={postCard}
              >
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Vertical line */}
        <div className="hidden md:block bg-gray-300 w-px min-h-full"></div>

        {/* Posted cards section */}
        <div className="w-full md:w-2/3 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {postedCards.map((card) => (
              <div key={card.id} className="p-4 rounded bg-white shadow" style={{ backgroundColor: card.color }}>
                <p>{card.content}</p>
                <div className="flex items-center mt-2 justify-between">
                  {card.username === 'Anonymous' ? (
                    <p className="text-sm text-gray-500">{card.username}</p>
                  ) : (
                    <div className="flex items-center">
                      <img className="w-6 h-6 rounded-full mr-2" src={card.avatar} alt="Avatar" />
                      <p className="text-sm text-gray-500">{card.username}</p>
                    </div>
                  )}
                  <div className="flex items-center">
                    <HeartOutlined
                      style={{ color: card.isHeartClicked ? '#5B21B6' : 'black', marginRight: '5px', cursor: 'pointer' }}
                      onClick={() => handleReaction(card.id, 'heart')}
                    />
                    <p className="text-sm text-gray-500">{card.reactions.heart}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
