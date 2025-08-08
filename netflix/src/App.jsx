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

const App = () => {
  const [id, setid] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`https://cinemo-pearl.vercel.app/api/show/now-playing`);
        setid(response.data.movies[2]?.id || '');
      } catch (err) { 
        setError(err.response?.data?.message || 'Failed to fetch trailer');
      }
    };
    fetchTrailer();
  }, []);
  
  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={<LoginSignup />} />
        <Route path='/browser' element={<Browser movieId={1142127} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/movies' element={<MyList head={"movies"} />} />
        <Route path='/tv-series' element={<MyList head={"tvSeries"} />} />
        <Route path='/animation' element={<MyList head={"animation"} />} />
        <Route path='/thriller' element={<MyList head={"thriller"} />} />
        <Route path='/drama' element={<MyList head={"drama"} />} />
        <Route path='/more' element={<MyList head={"My-list"} />} />
       
        
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