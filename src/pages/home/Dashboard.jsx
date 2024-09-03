import React, { useState, useEffect, useContext } from 'react';
import Header from '../../components/Header';
import CardPostedModal from '../../components/modals/CardPostedModal';
import PostedCard from '../../components/home/PostedCard';
import CardForm from '../../components/home/CardForm';
import EmptyState from '../../components/home/EmptyState';
import { Typography } from 'antd';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/Loading'; 

const { Title } = Typography;

const Dashboard = () => {
  const { token } = useContext(AppContext);
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [allPostLoading, setAllPostLoading] = useState(true);
  const [allPostError, setAllPostError] = useState('');
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState('');
  const [formState, setFormState] = useState({
    newCardContent: '',
    selectedColor: '#FFFFFF',
    postMode: 'reveal',
  });
  const [selectedCard, setSelectedCard] = useState(null);

  // Fetch all posts
  useEffect(() => {
    const fetchAllPosts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/all/posts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setAllPosts(data.posts);
                setPosts(data.posts); // Initialize user's posts or all posts
            } else {
                console.error('Failed to fetch all posts:', data.message);
                setAllPostError('Failed to fetch all posts');
            }
        } catch (err) {
            console.error('Failed to fetch all posts:', err);
            setAllPostError('Failed to fetch all posts');
        } finally {
            setAllPostLoading(false);
        }
    };

    fetchAllPosts();
}, [token]);
  // Fetch user posts if needed
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/all/posts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setPosts(data.posts);
          } else {
            console.error('Failed to fetch user posts:', data.message);
            setPostError('Failed to fetch user posts');
          }
        } catch (err) {
          console.error('Failed to fetch user posts:', err);
          setPostError('Failed to fetch user posts');
        } finally {
          setPostLoading(false);
        }
      }
    };

    fetchUserPosts();
  }, [token]);

  const handleFormChange = (key, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const postCard = async () => {
    const { newCardContent, postMode } = formState;
  
    if (newCardContent.trim() !== '') {
      const newCard = {
        content: newCardContent,
        is_anonymous: postMode === 'anonymous',
      };
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newCard),
        });
  
        if (response.ok) {
          const data = await response.json();
          setPosts((prevPosts) => [...prevPosts, data.post]);
          setFormState({
            newCardContent: '',
            selectedColor: '#FFFFFF',
            postMode: 'reveal',
          });
        } else {
          const errorData = await response.json();
          console.error('Error creating post:', errorData);
          alert(errorData.errors || 'An error occurred while creating the post.');
        }
      } catch (error) {
        console.error('Error creating post:', error.message);
        alert('An error occurred while creating the post.');
      }
    }
  };

  const handleReaction = async (cardId, reactionType) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts/${cardId}/react`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ reactionType }),
        });

        if (response.ok) {
            const updatedCard = await response.json(); // Expect the backend to return the updated state
            
            // Update the posts state with the updated card
            setPosts((prevPosts) =>
                prevPosts.map((card) =>
                    card.id === cardId ? { ...card, is_heart_clicked: updatedCard.is_heart_clicked } : card
                )
            );
        } else {
            const errorData = await response.json();
            console.error('Error updating reaction:', errorData);
            alert(errorData.error || 'An error occurred while updating the reaction.');
        }
    } catch (error) {
        console.error('Error updating reaction:', error.message);
        alert('An error occurred while updating the reaction.');
    }
};


  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const refreshPosts = () => {
    setAllPostLoading(true);
    fetchPosts();
  };
 

  return (
    <div className="min-h-screen pt-16 bg-gray-100 dark:bg-[#18191A] transition-all duration-200">
      <Header disableAddButton={false}  onHomeClick={refreshPosts}/>
      <div className="p-4 flex flex-col md:flex-row">
        <CardForm formState={formState} handleFormChange={handleFormChange} postCard={postCard} />
        <div className="hidden md:block bg-gray-300 dark:bg-violet-900 w-px min-h-full"></div>
  
        <div className="w-full md:w-2/3 p-4">
          <Title level={3} style={{ color: '#5B21B6', fontWeight: 'bold', fontFamily: 'Lobster, cursive' }}>
            Inkstream
          </Title>
  
          {allPostLoading ? (
            <Loading /> // Use the custom Loading component
          ) : allPostError ? (
            <p className="text-red-500 dark:text-red-300">{allPostError}</p>
          ) : posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {posts.map((card) => (
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
