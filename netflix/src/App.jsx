import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import Browser from './pages/Browser'

import axios from "axios"

import MyList from './pages/MyList'
import LoginSignup from './pages/LoginSignup'
import Profile from './pages/Profile'
import Thriller from './pages/Thriller'
import TV from './pages/TV'
import New from './pages/New'

const App = () => {
  const [id, setid] = useState('');
  const [error, setError] = useState(null);


  
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/browser' element={<Browser movieId={1142127} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/movies' element={<MyList head={"movies"} />} />
        
       
        
        <Route path='/home' element={<Home />} />
      </Routes>
      
      {error && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {error}
        </div>
      )}
    </>
  )
}

export default App