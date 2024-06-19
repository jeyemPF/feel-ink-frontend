import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/auth/Login'
import './index.css';  // Import Tailwind CSS



function App() {

  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
