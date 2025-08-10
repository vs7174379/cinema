import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Movie = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://cinemo-ashy.vercel.app/api/show/movie');
        if (response.data.success) {
          setMovies(response.data.movies);
        } else {
          console.error('Failed to fetch movies:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  const movie = movies.filter(m => m._id === id)[0]; // pick first match

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Movie not found.
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <p>{movie.description}</p>
    </div>
  );
};

export default Movie;
