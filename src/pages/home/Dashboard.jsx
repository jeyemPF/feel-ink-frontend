import React, { useState } from 'react';
import Header from '../../components/Header';
import CardPostedModal from '../../components/modals/CardPostedModal';
import PostedCard from '../../components/home/PostedCard';
import CardForm from '../../components/home/CardForm';
import EmptyState from '../../components/home/EmptyState';
import { Typography } from 'antd';

const { Title } = Typography;

const Dashboard = () => {
  const [postedCards, setPostedCards] = useState([]);
  const [formState, setFormState] = useState({
    newCardContent: '',
    selectedColor: '#FFFFFF',
    postMode: 'reveal',
  });
  const [selectedCard, setSelectedCard] = useState(null);

  const handleFormChange = (key, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const postCard = () => {
    const { newCardContent, selectedColor, postMode } = formState;
    if (newCardContent.trim() !== '') {
      const email = 'johnmarkparejafaeldonia@gmail.com';
      const username = postMode === 'reveal' ? "@" + email.split('@')[0] : 'Anonymous';
      const avatar = postMode === 'reveal'
        ? 'http://res.cloudinary.com/dihmqs39z/image/upload/v1717393349/ll3mgk5u2p1cvtzrjwyl.jpg'
        : null;

      const newCard = {
        id: postedCards.length + 1,
        content: newCardContent,
        color: selectedColor,
        username,
        avatar,
        reactions: { heart: 0 },
        isHeartClicked: false,
        timestamp: new Date().toISOString(),
      };

      setPostedCards((prevCards) => [...prevCards, newCard]);
      setFormState({
        newCardContent: '',
        selectedColor: '#FFFFFF',
        postMode: 'reveal',
      });
    }
  };

  const handleReaction = (cardId, reactionType) => {
    const updatedCards = postedCards.map((card) => {
      if (card.id === cardId) {
        const newReactions = { ...card.reactions };
        const isHeartClicked = !card.isHeartClicked;

        if (isHeartClicked) {
          newReactions[reactionType] += 1;
        } else {
          newReactions[reactionType] -= 1;
        }

        return { ...card, reactions: newReactions, isHeartClicked };
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

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Header addCard={postCard} disableAddButton={false} />
      <div className="p-4 flex flex-col md:flex-row">
        <CardForm formState={formState} handleFormChange={handleFormChange} postCard={postCard} />
        <div className="hidden md:block bg-gray-300 w-px min-h-full "></div>
        <div className="w-full md:w-2/3 p-4">
          <Title level={3} style={{ color: '#5B21B6', fontWeight: 'bold' }} className="font-bold justify-start text-justify pt-1">
            Inkstream
          </Title>
          {postedCards.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {postedCards.map((card) => (
                <PostedCard
                  key={card.id}
                  card={card}
                  openModal={openModal}
                  handleReaction={handleReaction}
                />
              ))}
            </div>
          )}
        </div>
        <CardPostedModal isOpen={!!selectedCard} onClose={closeModal} card={selectedCard} />
      </div>
    </div>
  );
};

export default Dashboard;
