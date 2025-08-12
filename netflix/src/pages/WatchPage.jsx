import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const WatchPage = () => {
  const [showUI, setShowUI] = useState(true);
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/show/movi/${id}`
        );
        if (response.data.success) {
          setMovie(response.data.movie);
        } else {
          setError(response.data.message || "Movie not found");
        }
      } catch (err) {
        setError(err.message || "Failed to load movie");
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // UI hide/show timer for inactivity
  useEffect(() => {
    const resetTimer = () => {
      if (!showUI) setShowUI(true); // Only update if currently hidden
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowUI(false), 3000);
    };

    // Trigger on multiple events, not just mouse move
    const events = ["mousemove", "click", "keydown", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      clearTimeout(timerRef.current);
    };
  }, [showUI]);

  // Handle loading & error
  if (loading) {
    return (
      <div className="bg-black text-white h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black text-red-500 h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-black text-white h-screen overflow-hidden relative">
      {/* Video Player */}
      {movie?.videoUrl ? (
        <iframe
          width="100%"
          height="100%"
          src={`${movie.videoUrl}?autoplay=1&controls=1`}
          title={movie?.title || "Video Player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p>No video available</p>
        </div>
      )}

      {/* Top Bar */}
      {showUI && (
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
          <a href="/movies" className="font-bold hover:underline">
            ⬅ Back
          </a>
          <h1 className="text-xl font-semibold">{movie?.title}</h1>
          <div></div>
        </div>
      )}

      {/* Bottom Info */}
      {showUI && (
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-2xl font-bold">{movie?.title}</h2>
          <p className="text-gray-300 text-sm mt-1">
            {movie?.year ? new Date(movie.year).getFullYear() : "Unknown Year"} •{" "}
            {movie?.genre || "Unknown Genre"}
          </p>
          <p className="mt-3 text-gray-200 max-w-2xl">
            {movie?.description || "No description available."}
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchPage;
