import React, { useState } from 'react';
import Header from '../../components/Header.jsx';

const Dashboard = () => {
  const [postedCards, setPostedCards] = useState([]);
  const [newCardContent, setNewCardContent] = useState('');

  // Function to handle content change of the new card
  const handleNewCardContentChange = (e) => {
    setNewCardContent(e.target.value);
  };

  // Function to add a new card to the posted cards
  const postCard = () => {
    if (newCardContent.trim() !== '') {
      const newCard = {
        id: postedCards.length + 1,
        content: newCardContent,
        timestamp: new Date().toLocaleString(), // Adding timestamp
      };
      setPostedCards([...postedCards, newCard]);
      setNewCardContent('');
      // Additional logic for posting (e.g., API call)
      console.log('Posting:', newCardContent);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header addCard={postCard} disableAddButton={false} />
      <div className="p-4 flex flex-col md:flex-row">
        {/* Writing section */}
        <div className="w-full md:w-1/3 p-4 mb-4 md:mb-0">
          <div className="p-4 rounded relative bg-white shadow">
            <textarea
              className="w-full h-32 border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-violet-500"
              value={newCardContent}
              onChange={handleNewCardContentChange}
              placeholder="What's on your mind..."
            />
            <button
              className="mt-2 bg-violet-800 text-white py-1 px-3 rounded hover:bg-violet-600 focus:outline-none"
              onClick={postCard}
            >
              Post
            </button>
          </div>
        </div>
        
        {/* Vertical line */}
        <div className="hidden md:block bg-gray-300 w-px min-h-full"></div>

        {/* Posted cards section */}
        <div className="w-full md:w-2/3 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {postedCards.map(card => (
              <div key={card.id} className="p-4 rounded bg-white shadow">
                <p>{card.content}</p>
                <p className="text-sm text-gray-500 mt-2">{card.timestamp}</p> {/* Display timestamp */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
