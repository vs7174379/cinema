import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import MovieContainer from '../components/MovieContainer';
import Sidebar from '../components/Sidebar';
import { VolumeX, Volume2 } from 'lucide-react';

const Browser = ({ movieId }) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [upComingmovies, setUpComingMovies] = useState([]);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(50);

  const iframeRef = useRef(null);

  const toggleMute = () => {
    setMuted(prev => !prev);
    postMessageToIframe(!muted, volume);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    postMessageToIframe(muted, newVolume);
  };

  const postMessageToIframe = (isMuted, vol) => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: isMuted ? "mute" : "unMute"
        }),
        "*"
      );
      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func: "setVolume",
          args: [parseInt(vol)]
        }),
        "*"
      );
    }
  };

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await axios.get('https://cinemo-pearl.vercel.app/api/show/popular-movies');
        if (response.data.success) {
          setMovies(response.data.movies);
        }
      } catch (error) {
        console.error('Error fetching now playing movies:', error.message);
      }
    };

    fetchNowPlaying();
  }, []);

  useEffect(() => {
    const fetchUpComingMovies = async () => {
      try {
        const response = await axios.get('https://cinemo-ashy.vercel.app/api/show/upcomming-movies');
        if (response.data.success) {
          setUpComingMovies(response.data.movies);
        }
      } catch (error) {
        console.error('Error fetching upcoming movies:', error.message);
      }
    };

    fetchUpComingMovies();
  }, []);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`https://cinemo-ashy.vercel.app/api/show/movie/${movieId}`);
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
      <Sidebar movies={movies} upcoming={upComingmovies} />

      <section className="w-full xl:w-3/4 space-y-6">
        <div className="glass relative w-full lg:h-[30rem] lg:w-[55rem] rounded-2xl overflow-hidden lg:ml-20">
          <div className="aspect-video w-full">
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              src={`${trailerUrl.replace('watch?v=', 'embed/')}?autoplay=1&loop=1&playlist=${trailerUrl.split('v=')[1]}&mute=${muted ? 1 : 0}&controls=0&rel=0&modestbranding=1&enablejsapi=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              playsInline
            ></iframe>
          </div>

          {/* Volume Control */}
          <div className="absolute bottom-4 right-4 z-30 flex items-center gap-3 bg-black/50 px-3 py-2 rounded">
            <button onClick={toggleMute} className="text-white focus:outline-none">
              {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 accent-white"
            />
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 p-2 sm:p-4 flex flex-col justify-center">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs w-fit">
              Trending Now
            </span>
            <h2 className="text-2xl font-bold">Mission Impossible</h2>
            <p className='hidden sm:flex text-sm sm:font-medium w-1/2 text-gray-200'>
              Pradeep Ranganathan stars as Dragon, a heartbroken college dropout determined to succeed — even if it means conning his way to the top.
            </p>

            <div className="mt-3 flex gap-2">
              <button className="flex items-center gap-2 px-2 text-black bg-white rounded-md font-semibold hover:bg-gray-300 transition">
                <i className="fas fa-play" />
                Play
              </button>
              <button className="flex items-center gap-2 px-2 text-white bg-black border border-white/30 rounded-md font-semibold hover:bg-white/30 transition">
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

export default Browser;
