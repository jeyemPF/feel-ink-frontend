import React, { useState } from 'react';
import Header from '../../components/Header.jsx';

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [currentCardPosted, setCurrentCardPosted] = useState(true);

  // Function to handle content change of a card
  const handleContentChange = (id, newContent) => {
    setCards(cards.map(card => card.id === id ? { ...card, content: newContent } : card));
  };

  // Function to add a new card
  const addCard = () => {
    if (currentCardPosted) {
      setCards([...cards, { id: cards.length + 1, content: '', visible: true }]);
      setCurrentCardPosted(false);
    }
  };

  // Function to post a card
  const postCard = (id) => {
    const card = cards.find(card => card.id === id);
    if (card.content.trim() !== '') {
      setCurrentCardPosted(true);
      // Additional logic for posting (e.g., API call)
      console.log('Posting:', card.content);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header addCard={addCard} disableAddButton={!currentCardPosted} />
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(card => (
            <div key={card.id} className="p-4 rounded relative">
              <textarea
                className="w-full h-32 border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-violet-500"
                value={card.content}
                onChange={(e) => handleContentChange(card.id, e.target.value)}
                placeholder="Write here..."
              />
              <button
                className="mt-2 bg-violet-800 text-white py-1 px-3 rounded hover:bg-violet-600 focus:outline-none"
                onClick={() => postCard(card.id)}
              >
                Post
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
