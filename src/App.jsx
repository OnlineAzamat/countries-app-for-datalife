import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './components/Home'
import Navbar from './components/Navbar'
import NotFoundPage from './components/NotFoundPage'

import './App.scss'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
