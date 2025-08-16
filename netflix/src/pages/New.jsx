import axios from 'axios';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import Loader from '../components/Loader';



export default function New() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  const nw= movie.filter(m =>
    m.type === 'coming this week"' 
  );




  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://cinema-flame-seven.vercel.app/api/show/movie');
        const data = response.data.movies
        if (response.data.success) {
          setMovie(data);
          setLoading(false);
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
      <div className="flex items-center justify-center px-6 py-52 text-white">
        <Loader />
      </div>
    );
  }

 
  return (
    <div className="p-6  min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">New/upcoming </h2>
      <div>
        <MovieList title={"coming this week"} movies={nw} />
       



      </div>
    </div>
  );
}
