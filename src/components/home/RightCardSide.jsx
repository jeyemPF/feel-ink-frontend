// import React, { useState } from 'react';
// import { Button, Avatar, Modal, Input, Rate } from 'antd';
// import { BuildingOutlined, SchoolOutlined, StarFilled, MessageOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';

// const RightCardSide = () => {
//   const [showAllBookmarks, setShowAllBookmarks] = useState(false);
//   const [showFeedbackModal, setShowFeedbackModal] = useState(false);
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [newFeedback, setNewFeedback] = useState({ rating: 0, comment: '' });
//   const [currentProvider, setCurrentProvider] = useState(null);

//   // Placeholder user data
 
//   // Extended bookmark data with provider IDs
//   const bookmarks = [
//     { type: 'school', title: 'La Verdad Christian College', providerId: 'lvcc001' },
//     { type: 'ojt', title: 'QuickStrike', providerId: 'qs001' },
//     { type: 'school', title: 'University of the Philippines', providerId: 'up001' },
//     { type: 'internship', title: 'Google Summer of Code', providerId: 'gsoc001' },
//   ];

//   const getBookmarkIcon = (type) => {
//     switch (type) {
//       case 'school':
//         return <SchoolOutlined />;
//       case 'internship':
//         return <BuildingOutlined />;
//       case 'ojt':
//         return <BuildingOutlined />;
//       default:
//         return null;
//     }
//   };

//   const visibleBookmarks = showAllBookmarks ? bookmarks : bookmarks.slice(0, 3);

//   const handleSeeMore = () => {
//     setShowAllBookmarks(!showAllBookmarks);
//   };

//   const handleFeedbackSubmit = () => {
//     if (currentProvider) {
//       setFeedbacks([...feedbacks, { id: Date.now().toString(), providerId: currentProvider, ...newFeedback }]);
//       setNewFeedback({ rating: 0, comment: '' });
//       setShowFeedbackModal(false);
//     }
//   };

//   return (
//     <div className="w-64 bg-background p-6 flex flex-col space-y-6 border-l h-screen overflow-y-auto sticky top-16">
//       <div className="space-y-4">
//         <h3 className="text-sm font-semibold">Saved Bookmarks</h3>
//         <div className="space-y-2">
//           {visibleBookmarks.map((bookmark, index) => (
//             <div key={index} className="flex items-center justify-between">
//               <Button type="text" icon={getBookmarkIcon(bookmark.type)} className="w-full justify-start">
//                 {bookmark.title}
//               </Button>
//               <Button 
//                 type="text" 
//                 icon={<MessageOutlined />} 
//                 onClick={() => {
//                   setCurrentProvider(bookmark.providerId);
//                   setShowFeedbackModal(true);
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//         {bookmarks.length > 3 && (
//           <Button 
//             type="text" 
//             className="w-full justify-between text-muted"
//             onClick={handleSeeMore}
//           >
//             {showAllBookmarks ? 'See Less' : 'See More'}
//             {showAllBookmarks ? <DownOutlined /> : <RightOutlined />}
//           </Button>
//         )}
//       </div>

//       <Modal
//         title={`Provide Feedback for ${bookmarks.find(b => b.providerId === currentProvider)?.title}`}
//         visible={showFeedbackModal}
//         onOk={handleFeedbackSubmit}
//         onCancel={() => setShowFeedbackModal(false)}
//       >
//         <Rate 
//           value={newFeedback.rating} 
//           onChange={(value) => setNewFeedback({ ...newFeedback, rating: value })} 
//           character={<StarFilled />} 
//         />
//         <Input.TextArea
//           placeholder="Write your feedback here..."
//           value={newFeedback.comment}
//           onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default RightCardSide;
