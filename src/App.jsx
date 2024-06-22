// src/App.jsx

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login.jsx';
import Dashboard from './pages/home/Dashboard.jsx';
import './index.css'; // Import Tailwind CSS

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
