import React, { useEffect, useState } from 'react'
import MovieContainer from '../components/MovieContainer'
import ImageSlider from '../components/ImageSlider'
import axios from 'axios';

const Signup = () => {
  const [movies, setMovies] = useState([]);
  
  
      useEffect(() => {
          const fetchNowPlaying = async () => {
              try {
                  const response = await axios.get('http://localhost:3000/api/show/toprated-movies');
                  if (response.data.success) {
                      setMovies(response.data.movies);
                  }
              } catch (error) {
                  console.error('Error fetching now playing movies:', error.message);
              } finally {
                  setLoading(false);
              }
          };
  
          fetchNowPlaying();
      }, []);
  
  return (
    <div>
      <ImageSlider images={movies}/>
    </div>
  )
}

export default Signup