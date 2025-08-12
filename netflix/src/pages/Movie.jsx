import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const WatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUI, setShowUI] = useState(true);
  const timerRef = useRef(null);
  const videoRef = useRef(null);

  // Fetch movie
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://cinema-flame-seven.vercel.app/api/show/movi/${id}`
        );
        setMovie(res.data.movie);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Auto-hide controls on inactivity
  useEffect(() => {
    const resetTimer = () => {
      if (!showUI) setShowUI(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowUI(false), 3000);
    };

    const events = ["mousemove", "click", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    resetTimer(); // start immediately

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, [showUI]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!movie) return <div className="text-white">Movie not found</div>;

  return (
    <div className="bg-black h-screen w-screen relative">
      {/* Video Player */}
      <iframe
        className="w-full h-full"
        src={`${movie.trailerUrl}?autoplay=1&controls=1`}
        title={movie.title}
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* Controls */}
      {showUI && (
        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/40 via-transparent to-black/40">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-4">
            <button
              className="text-white text-lg"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <h1 className="text-white font-bold">{movie.title}</h1>
            <div></div>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                className="text-white text-xl"
                onClick={() =>
                  videoRef.current.paused
                    ? videoRef.current.play()
                    : videoRef.current.pause()
                }
              >
                ⏯
              </button>
              <button
                className="text-white text-xl"
                onClick={() =>
                  videoRef.current.requestFullscreen()
                }
              >
                ⛶
              </button>
            </div>
            <span className="text-white text-sm">{movie.duration} min</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchPage;
