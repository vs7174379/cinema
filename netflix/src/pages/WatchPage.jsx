import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const WatchPage = () => {

  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    // Fetch movie details
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}show/movi/${id}`);
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




  return (
    <div className="bg-black text-white h-screen overflow-hidden relative">
      {/* YouTube Player */}
      <iframe
        width="100%"
        height="100%"
        src={`${movie.trailerUrl}?autoplay=1&controls=1`} // Use movie.videoUrl
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>


      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <a href="/movies" className="font-bold hover:underline">
          ⬅ Back
        </a>
        <h1 className="text-xl font-semibold">{movie.title}</h1> {/* Use movie.title */}
        <div></div>
      </div>


      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
        <h2 className="text-2xl font-bold">{movie.title}</h2> {/* Use movie.title */}
        <p className="text-gray-300 text-sm mt-1">
          {new Date(movie.year).getFullYear()} • {movie.genre} {/* Use movie data */}
        </p>
        <p className="mt-3 text-gray-200 max-w-2xl">{movie.description}</p> {/* Use movie.description */}
      </div>

    </div>
  );
};

export default WatchPage;
