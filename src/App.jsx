import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Detail from './components/Detail'

import './App.scss'

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/country/:name' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
