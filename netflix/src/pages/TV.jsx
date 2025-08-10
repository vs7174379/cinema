import axios from 'axios';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';



export default function TV({ head }) {
  const [movie, setMovie] = useState([]);
  const top = movie.filter(m =>
    m.type === 'romantic indian movies'
  );
 
 
  const emotional = movie.filter(m =>
    m.type === 'top emotional indian movies'
  );

  const thriller = movie.filter(m =>
    m.type === 'top thriller indian movies'
  );

 
  const kDrama = movie.filter(m =>
    m.type === 'k dramas'
  );
  const series = movie.filter(m =>
    m.type === 'top  indian web series'
  );
  const crime = movie.filter(m =>
    m.type === 'Indian Crime Web Series'
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
        <MovieList title={"K-Drama"} movies={kDrama} />
        <MovieList title={"web-Series"} movies={series} />
        <MovieList title={"Emotional-Movies"} movies={emotional} />
        <MovieList title={"Crime-web-series"} movies={crime} />
        <MovieList title={"Thriller-Movies"} movies={thriller} />



      </div>
    </div>
  );
}
