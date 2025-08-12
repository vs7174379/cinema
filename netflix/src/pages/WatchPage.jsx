import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const WatchPage = () => {
  const { id } = useParams();
  const [showUI, setShowUI] = useState(true);
  const timerRef = useRef(null);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Movie data from given JSON
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}show/movie/${id}`);
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

  // Inactivity detection
  useEffect(() => {
    const resetTimer = () => {
      if (!showUI) setShowUI(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowUI(false), 3000);
    };

    const events = ["mousemove", "click", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, [showUI]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading movie details...
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
        Movie not found.
      </div>
    );
  }

  return (
    <div className="bg-black text-white h-screen relative overflow-hidden">
      {/* Trailer Video */}
      <iframe
        className="w-full h-full"
        src={`${movie.trailerUrl}?autoplay=1&controls=1`}
        title={movie.title}
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* Top Bar */}
      <div
        className={`absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-500 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link to="/movies" className="font-bold hover:underline">
          ⬅ Back
        </Link>
        <h1 className="text-xl font-semibold">{movie.title}</h1>
        <div></div>
      </div>

      {/* Bottom Info */}
      <div
        className={`absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <p className="text-gray-300 text-sm mt-1">
          {new Date(movie.releaseDate).getFullYear()} • {movie.genre.join(", ")}{" "}
          • {movie.duration} min • Rating: {movie.rating.toFixed(1)}
        </p>
        <p className="mt-3 text-gray-200 max-w-2xl">{movie.description}</p>

        {/* Cast */}
        <div className="mt-4">
          <h3 className="font-semibold">Cast:</h3>
          <p className="text-gray-300 text-sm">
            {movie.cast.map((actor) => actor.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
