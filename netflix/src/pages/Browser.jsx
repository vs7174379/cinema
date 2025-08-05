import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import axios from "axios"
import MovieContainer from '../components/MovieContainer';

import Sidebar from '../components/Sidebar';
const Browser = ({ movieId }) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [error, setError] = useState(null);

  const [movies, setMovies] = useState([]);
  const [upComingmovies, setUpComingMovies] = useState([]);


  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/show/popular-movies');
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

  useEffect(() => {
    const fetchUpComingMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/show/upcomming-movies');
        if (response.data.success) {
          setUpComingMovies(response.data.movies);
        }
      } catch (error) {
        console.error('Error fetching now playing movies:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpComingMovies();
  }, []);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/show/movie/${movieId}`);
        setTrailerUrl(response.data.url);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch trailer');
      }
    };

    if (movieId) {
      fetchTrailer();
    }
  }, [movieId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!trailerUrl) return <p>Loading trailer...</p>;

  return (
    <div className="flex flex-col xl:flex-row gap-4 p-4">

      {/* Sidebar */}
      <Sidebar movies={movies} upcoming={upComingmovies} />

      {/* Main Content */}
      <section className="w-full xl:w-3/4 space-y-6">
        {/* Featured Movie */}
        <div className="glass relative w-full lg:h-[30rem] lg:w-[55rem] rounded-2xl overflow-hidden lg:ml-20">
          <div className="aspect-video  w-full pointer-events-none">
            <iframe
              className="w-full aspect-video "
              src={`${trailerUrl.replace('watch?v=', 'embed/')}?autoplay=1&loop=1&playlist=${trailerUrl.split('v=')[1]}&mute=1&controls=0&rel=0&modestbranding=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              playsInline
            ></iframe>

          </div>
          <div className="absolute inset-0 p-2 sm:p-4 flex flex-col justify-evenly">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs w-fit">
              Trending Now
            </span>
            <h2 className="text-3xl font-bold">Mission Impossible</h2>
            <p className='text-2xl font-medium w-1/2 text-gray-200'>Pradeep Ranganathan stars as Dragon, a heartbroken college dropout determined to succeed — even if it means conning his way to the top.</p>

            <div className="mt-3 flex gap-2">
              <button className="flex items-center gap-2 px-5 py-2 text-black bg-white rounded-md font-semibold hover:bg-gray-300 transition">
                <i className="fas fa-play" />
                Play
              </button>
              <button className="flex items-center gap-2 px-5 py-2 text-white bg-black border border-white/30 rounded-md font-semibold hover:bg-white/30 transition">
                <i className="fas fa-info-circle" />
                More Info
              </button>
            </div>
          </div>
        </div>

        <MovieContainer />



      </section>
    </div>


  );
};

export default Browser