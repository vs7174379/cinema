import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Home from './pages/Home'
import Browser from './pages/Browser'
import Login from './pages/Login'
import axios from "axios"
import Signup from './pages/Signup'
import MyList from './pages/MyList'
const App = () => {
  const [id, setid] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`https://cinemo-pearl.vercel.app/api/show/now-playing`);
        setid(response.data.movies[2].id);
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
        <Route path='/' element={<MyList />} />
        <Route path='/login' element={<Login />} />
        <Route path='/browser' element={<Browser movieId={id} />} />   
        <Route path='/l' element={<Signup/>} />          
      </Routes >

      

    </>
  )
}

export default App