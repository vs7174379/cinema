import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'

import Browser from './pages/Browser'

import axios from "axios"

import MyList from './pages/MyList'
import LoginSignup from './pages/LoginSignup'
import Profile from './pages/Profile'
import TV from './pages/TV'
import Movie from './pages/Movie'
import Thriller from './pages/Thriller'
import New from './pages/New'

import Watch from './Watch'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Subscription from './pages/Subscription'

const App = () => {
  const [id, setid] = useState('');
  const [error, setError] = useState(null);



  return (
    <>
      <Toaster />
      <Navbar />
      <Routes >
        <Route path='/' element={<LoginSignup />} />
        <Route path='/browser' element={<Browser movieId={1142127} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/movies' element={<MyList head={"movies"} />} />
        <Route path='/movies/:id' element={<Movie />} />
        <Route path='/movies/:id/watch' element={<Watch />} />
        <Route path='/tv-series' element={<TV />} />
        <Route path='/animation' element={<MyList head={"animation"} />} />
        <Route path='/thriller' element={<Thriller />} />
        <Route path='/drama' element={<New />} />
        <Route path='/new' element={<Add/>} />
        <Route path='/:id' element={<Edit/>} />
        <Route path='/Sbskripsn' element={<Subscription/>} />
        <Route path='/mylist' element={<MyList head={"My-list"} />} />

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