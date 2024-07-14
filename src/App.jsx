// src/App.jsx

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Dashboard from './pages/home/Dashboard';
import Profile from './pages/home/Profile/Profile';
import './index.css'; // Import Tailwind CSS

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
