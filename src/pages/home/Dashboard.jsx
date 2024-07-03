import React, { useState } from 'react';
import Header from '../../components/Header';
import CardPostedModal from '../../components/modals/CardPostedModal';
import { HeartOutlined } from '@ant-design/icons';
import logo from '../../assets/logo/logos.png';
import bump from '../../assets/logo/bump2.png'
import { formatTimestamp } from '../../utils/dateUtils';
import { Typography } from 'antd';

const { Title } = Typography;

const Dashboard = () => {
  const [postedCards, setPostedCards] = useState([]);
  const [newCardContent, setNewCardContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF'); // Default color
  const [postMode, setPostMode] = useState('reveal'); // Default post mode
  const [selectedCard, setSelectedCard] = useState(null); // State to track selected card for modal display

  const handleNewCardContentChange = (e) => {
    setNewCardContent(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handlePostModeChange = (mode) => {
    setPostMode(mode);
  };

  const postCard = () => {
    if (newCardContent.trim() !== '') {
      const email = 'johnmarkparejafaeldonia@gmail.com';
      const username = postMode === 'reveal' ? "@" + email.split('@')[0] : 'Anonymous';
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
        timestamp: new Date().toISOString(), // Use ISO string for timestamp
      };

      setPostedCards([...postedCards, newCard]);
      setNewCardContent('');
      // Additional logic for posting (e.g., API call)
      console.log('Posting:', newCardContent);
    }
  };

  const handleReaction = (cardId, reactionType) => {
    const updatedCards = postedCards.map((card) => {
      if (card.id === cardId) {
        const newReactions = { ...card.reactions };
        const isHeartClicked = !card.isHeartClicked;

        if (isHeartClicked) {
          newReactions[reactionType] += 1; // Increment reaction count
        } else {
          newReactions[reactionType] -= 1; // Decrement reaction count
        }

        return {
          ...card,
          reactions: newReactions,
          isHeartClicked: isHeartClicked,
        };
      }
      return card;
    });

    setPostedCards(updatedCards);
  };

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const colorOptions = ['#FFFFFF', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD'];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header addCard={postCard} disableAddButton={false} />
      <div className="p-4 flex flex-col md:flex-row">
        {/* Writing section */}
        <div className="w-full md:w-1/2 p-4 mb-4 md:mb-0">
          <div className="p-4 rounded relative bg-white shadow">
            <div className="flex items-center ">
              <img src={logo} alt="Feelink Logo" className="w-5 h-5" />
              <Title level={5} style={{ color: '#5B21B6' }} className="font-bold justify-start text-justify pt-1">
                Compose Your Ink
              </Title>
            </div>

            <textarea
              className="w-full h-18 border-2 rounded p-2 focus:outline-none"
              value={newCardContent}
              onChange={handleNewCardContentChange}
              placeholder="Write your thoughts..."
              style={{ border: `2px solid ${selectedColor !== '#FFFFFF' ? selectedColor : '#c0c0c0'}` }}
            />

            <div className="flex flex-col md:flex-column items-center mt-2 ">
              {/* Display color selection dropdown */}
              <div className="flex flex-col md:flex-row sm:flex-row mb-2 w-full ">
                <select
                  className="mt-2 md:mt-0 md:ml-1 sm:mt-0  sm:ml-2 bg-white border border-gray-300 rounded px-3 py-1  focus:outline-none w-full md:w-full "
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
                  className="mt-2 md:mt-0 md:mr-1 sm:mt-0 sm:ml-2 bg-white border border-gray-300 rounded px-3 py-1  focus:outline-none w-full"
                  value={postMode}
                  onChange={(e) => handlePostModeChange(e.target.value)}
                >
                  <option value="reveal">Reveal Me</option>
                  <option value="anonymous">Anonymous</option>
                </select>
              </div>

              <button
                className="mt-2 md:mt-0 md:ml-2 bg-violet-800 text-white py-1 px-3 rounded hover:bg-violet-600 focus:outline-none w-full"
                onClick={postCard}
              >
                <p>Publish</p>
              </button>
            </div>
          </div>
        </div>

        {/* Vertical line */}
        <div className="hidden md:block bg-gray-300 w-px min-h-full "></div>

        {/* Posted cards section */}
        <div className="w-full md:w-2/3 p-4">
          <Title level={3} style={{ color: '#5B21B6', fontWeight: 'bold' }} className="font-bold justify-start text-justify pt-1">
            Inkstream
          </Title>
          {postedCards.length === 0 ? (
            <>
          <div className="flex items-center flex-col text-gray-500 mt-4">
          <img src={bump} alt="Bump Logo" className="w-40 h-40" />
              <p>No stories found</p>
            </div></>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {postedCards.map((card) => (
                <div
                  key={card.id}
                  className="p-4 rounded bg-white shadow cursor-pointer"
                  style={{ backgroundColor: card.color }}
                  onClick={() => openModal(card)}
                >
                  <div className="flex items-center justify-between">
                    {card.username === 'Anonymous' ? (
                      <p className="text-sm text-gray-500">{card.username}</p>
                    ) : (
                      <div className="flex items-center">
                        <img
                          className="w-6 h-6 rounded-full mr-2"
                          src={card.avatar}
                          alt="Avatar"
                        />
                        <p className="text-sm" style={{ color: card.color === '#9575CD' || card.color === '#B39DDB' ? '#f2ebeb' : 'inherit' }}>{card.username}</p>
                      </div>
                    )}
                    <p className="text-xs" style={{ color: card.color === '#9575CD' || card.color === '#B39DDB' ? '#f2ebeb' : 'inherit' }}>{formatTimestamp(card.timestamp)}</p>
                  </div>
                  <p className="overflow-hidden overflow-ellipsis pt-2 " style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                    {card.content}
                  </p>
                  <div className="flex items-center mt-2 justify-end">
                    <div className="flex items-center">
                      <HeartOutlined
                        style={{
                          color: card.isHeartClicked ? 'violet' : '#1e1d1f',
                          marginRight: '5px',
                          marginTop: '2px',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReaction(card.id, 'heart');
                        }}
                      />
                      <p className="text-sm" style={{ color: card.color === '#9575CD' || card.color === '#B39DDB' ? '#f2ebeb' : 'inherit' }}>{card.reactions.heart}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        <CardPostedModal isOpen={!!selectedCard} onClose={closeModal} card={selectedCard} />
      </div>
    </div>
  );
};

export default Dashboard;
