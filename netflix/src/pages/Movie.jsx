import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Movie = () => {
  const { id } = useParams();
  const [movi, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const movie=movi.filter(m =>
    m._id === id
  );

   useEffect(() => {
      const fetchMovies = async () => {
        try {
          const response = await axios.get('https://cinemo-ashy.vercel.app/api/show/movie');
          const data = response.data.movies
          if (response.data.success) {
            setMovie(data);
          } else {
            console.error('Failed to fetch movies:', data.message);
          }
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      }
      fetchMovies();
    }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading movie details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Error: {error}
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Movie not found.
      </div>
    );
  }

  return (
    <div>
       {movie.title}
    </div>
  );
};

export default Movie;
