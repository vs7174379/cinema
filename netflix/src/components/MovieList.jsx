import React, { useEffect, useId, useRef, useState } from 'react';
import Cards from './Cards';
import { Droplet, Play, Plus } from 'lucide-react';
import axios from 'axios';


const MovieList = ({ title, movies, searchMovies = false }) => {
  const [movie, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://cinemo-ashy.vercel.app/api/show/movie');
        const data = await response.json();
        if (data.success) {
          setMovies(data.movies);
        } else {
          console.error('Failed to fetch movies:', data.message);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div>
      

     

      {/* You Might Like - 1 */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold px-2">{movie[0].title}</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar p-2">
            {movie.map((p, index) => (
              <Cards video={p} key={index}/>
            ))}
          </div>
        </div>

      

      
    </div>
  );
};



export default MovieList;
