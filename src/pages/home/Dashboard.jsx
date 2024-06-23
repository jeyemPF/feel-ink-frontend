// src/pages/home/Dashboard.jsx

import React, { useState } from 'react';
import Header from '../../components/Header.jsx';

const Dashboard = () => {
  const [cards, setCards] = useState([
    { id: 1, content: '' },
    { id: 2, content: '' },
    { id: 3, content: '' },
    { id: 4, content: '' },
  ]);

  const handleContentChange = (id, newContent) => {
    setCards(cards.map(card => card.id === id ? { ...card, content: newContent } : card));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(card => (
            <div key={card.id} className="bg-white p-4 rounded shadow">
              <textarea
                className="w-full h-full border-2 border-gray-300 rounded p-2 focus:outline-none focus:border-violet-500"
                value={card.content}
                onChange={(e) => handleContentChange(card.id, e.target.value)}
                placeholder="Write here..."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
