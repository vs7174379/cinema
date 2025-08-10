import axios from 'axios';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';



export default function Thriller({ head }) {
  const [movie, setMovie] = useState([]);

  const marvel = movie.filter(m =>
    m.type === 'marvel movies'
  );

  const south = movie.filter(m =>
    m.type === 'top south indian movies'
  );
  const thriller = movie.filter(m =>
    m.type === 'top thriller indian movies'
  );
  const hollywood = movie.filter(m =>
    m.type === 'hollywood movies'
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

 
  return (
    <div className="p-6  min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">{head} </h2>
      <div>
        <MovieList title={"Marvel-Hits"} movies={marvel} />
        <MovieList title={"Tollywood-BlockBusters"} movies={south} />
        <MovieList title={"Thriller-Movies"} movies={thriller} />
        <MovieList title={"Hollywood-Movies"} movies={hollywood} />



      </div>
    </div>
  );
}
