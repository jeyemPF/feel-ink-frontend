import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Dashboard from './pages/home/Dashboard';
import Profile from './pages/home/Profile/Profile';
import PrivateRoute from './components/PrivateRoute';
import GoogleCallback from './components/auth/GoogleCallback';
import './index.css';
import LoginSuccess from './components/auth/LoginSucess';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
          {/* <Route path="/auth/google/callback" element={<GoogleCallback />} /> */}
          <Route path="/auth/google/callback" element={<LoginSuccess />} />

          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;