import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VolumeX, Volume2 } from 'lucide-react';

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(50);
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}show/movie/${id}`
        );

        if (response.data.success) {
          setMovie(response.data.movie);
        } else {
          setError(response.data.message || "Movie not found");
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to load movie");
        console.error("Error fetching movie:", err);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="bg-black text-white h-screen relative overflow-hidden">
      {/* YouTube Player */}
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        src={`${movie.trailerUrl}?autoplay=1&loop=1&playlist=${movie.trailerUrl.split('v=')[1]}&mute=${muted ? 1 : 0}&controls=0&rel=0&modestbranding=1&enablejsapi=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

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

      {/* Overlays */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={() => navigate(-1)} className="font-bold hover:underline">
          ⬅ Back
        </button>
        <h1 className="text-xl font-semibold">{movie.title}</h1>
        <div></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <p className="text-gray-300 text-sm mt-1">
          {new Date(movie.year).getFullYear()} • {movie.genre}
        </p>
        <p className="mt-3 text-gray-200 max-w-2xl">{movie.description}</p>
      </div>
    </div>
  );
};

export default Watch;
