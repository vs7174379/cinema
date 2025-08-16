import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';


const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://cinema-flame-seven.vercel.app/api/show/movi/${id}`);
        setMovie(response.data.movie);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <Loader />
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
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <main className="flex flex-col overflow-y-auto h-full" id="style-7">
        {/* Hero Section */}
        <section className="relative flex flex-col lg:items-center">
          <div
            className="relative min-h-[40vh] sm:min-h-[60vh] lg:min-h-[70vh] bg-cover bg-center rounded-2xl m-4 sm:m-10 overflow-hidden lg:w-[60rem]"
            style={{
              backgroundImage: `url(${movie.backdrop})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-transparent"></div>
          </div>

          {/* Movie Info */}
          <div className="flex flex-col items-center relative z-10 px-6 sm:px-10 -mt-48 sm:-mt-72 mx-auto lg:w-[60rem]    inset-0 bg-gradient-to-t from-black via-black to-black/20">
            <h1 className="text-4xl sm:text-5xl sm:font-bold mb-4">{movie.title}</h1>
            <p className="text-gray-200 sm:text-xl md:w-1/2 sm:font-bold leading-relaxed mb-4">
              {movie.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-2">
              <span>IMDb {movie.rating}</span> •
              <span>{Math.floor(movie.duration / 60)}h {movie.duration % 60}min</span> •
              <span>{new Date(movie.releaseDate).getFullYear()}</span>
              {/* Add other relevant details as needed */}
            </div>
            <div className="text-sm text-blue-400 font-semibold mb-6 flex flex-wrap gap-3">
              {movie.genre}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">

              <button onClick={() => navigate(`/movies/${id}/watch`)} className="bg-white text-black font-semibold px-6 py-3 rounded flex items-center gap-2 text-lg">
                <i className="fas fa-play" /> Watch now
              </button>


            </div>

            <div className="flex gap-4 mb-4 text-xl">
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full">
                <i className="fas fa-film" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full">
                <i className="fas fa-plus" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full">
                <i className="fas fa-thumbs-up" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full">
                <i className="fas fa-share" />
              </button>
            </div>
            <button onClick={() => navigate(`/edit`)} className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm">
              Edit
            </button>

          </div>
        </section>

        {/* Tabs */}
        <div className="flex gap-6 px-6 sm:px-10 pt-6 text-lg border-b border-gray-600">
          <button className="border-b-2 border-white pb-2 font-semibold">Related</button>
          <button className="text-gray-400 hover:text-white pb-2">Details</button>
        </div>

        {/* Related Movies */}
        <section className="px-6 sm:px-10 py-6">
          <h2 className="text-xl font-semibold mb-4">Customers also watched</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[...Array(10)].map((_, idx) => (
              <div key={idx} className="w-36 sm:w-48 flex-shrink-0 relative">
                <img
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS_WhubxLwynDD0XPpLbF9Ol-QYjPrfiia4e2Gd2QHmLztf--FZpK9WAemCIcUXgL9Brv1W"
                  alt="Related Movie"
                  className="rounded w-full"
                />
                <span className="absolute bottom-2 right-2 bg-white/80 text-black px-2 text-xs rounded">
                  MX PLAYER
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Movie;
