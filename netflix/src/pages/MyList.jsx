import axios from 'axios';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';



export default function MyList({ head }) {
  const [movie, setMovie] = useState([]);
  const top = movie.filter(m =>
    m.type === 'romantic indian movies'
  );
  const comedyMovies = movie.filter(m =>
    m.type === 'top comedy indian movies'
  );
  const marvel = movie.filter(m =>
    m.type === 'marvel movies'
  );
  const emotional = movie.filter(m =>
    m.type === 'top emotional indian movies'
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
  const hollywoodRomantic = movie.filter(m =>
    m.type === 'hollywood romantic movies'
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
        <MovieList title={"Romantic Movies"} movies={top} />
        <MovieList title={"Comedy Movies"} movies={comedyMovies} />
        <MovieList title={"Marvel-Hits"} movies={marvel} />
        <MovieList title={"Emotional-Movies"} movies={emotional} />
        <MovieList title={"Tollywood-BlockBusters"} movies={south} />
        <MovieList title={"Thriller-Movies"} movies={thriller} />
        <MovieList title={"Hollywood-Movies"} movies={hollywood} />
        <MovieList title={"Hollywood-Romantic-Movies"} movies={hollywoodRomantic} />



      </div>
    </div>
  );
}
