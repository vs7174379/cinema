import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [inWatchlist, setInWatchlist] = useState(false);
  const [userId, setUserId] = useState(null);

  // ✅ Fetch logged-in user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}user/profile`,
          { withCredentials: true }
        );
        console.log("Profile data:", res.data);

        if (res.data.user) {
          setUserId(res.data.user._id);
        } else {
          setUserId(null);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Fetch watchlist status
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get(
          `https://cinema-flame-seven.vercel.app/api/watchlist/${userId}`
        );
        const isAdded = res.data.watchlist.some(
          (item) => item.movieId._id === id
        );
        setInWatchlist(isAdded);
      } catch (err) {
        console.error("Error fetching watchlist", err);
      }
    };

    if (userId) fetchWatchlist();
  }, [userId, id]);

  // ✅ Toggle watchlist
  const toggleWatchlist = async () => {
    try {
      if (inWatchlist) {
        await axios.post(
          "https://cinema-flame-seven.vercel.app/api/watchlist/remove",
          { userId, movieId: id }
        );
        setInWatchlist(false);
      } else {
        await axios.post(
          "https://cinema-flame-seven.vercel.app/api/watchlist/add",
          { userId, movieId: id }
        );
        setInWatchlist(true);
      }
    } catch (err) {
      console.error("Error updating watchlist", err);
    }
  };

  // ✅ Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://cinema-flame-seven.vercel.app/api/show/movi/${id}`
        );
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
      <div className="flex items-center justify-center px-6 py-52 text-white">
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
          <div className="flex flex-col items-center relative z-10 px-6 sm:px-10 -mt-48 sm:-mt-72 mx-auto lg:w-[60rem] inset-0 bg-gradient-to-t from-black via-black to-black/20">
            <h1 className="text-4xl sm:text-5xl sm:font-bold mb-4">
              {movie.title}
            </h1>
            <p className="text-gray-200 sm:text-xl md:w-1/2 sm:font-bold leading-relaxed mb-4">
              {movie.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-2">
              <span>IMDb {movie.rating}</span> •
              <span>
                {Math.floor(movie.duration / 60)}h {movie.duration % 60}min
              </span>{" "}
              •
              <span>{new Date(movie.releaseDate).getFullYear()}</span>
            </div>
            <div className="text-sm text-blue-400 font-semibold mb-6 flex flex-wrap gap-3">
              {movie.genre}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <button
                onClick={() => navigate(`/movies/${id}/watch`)}
                className="bg-white text-black font-semibold px-6 py-3 rounded flex items-center gap-2 text-lg"
              >
                <i className="fas fa-play" /> Watch now
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-4 text-xl">
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full">
                <i className="fas fa-film" />
              </button>

              <button
                onClick={toggleWatchlist}
                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition"
              >
                {inWatchlist ? (
                  <i className="fas fa-check" />
                ) : (
                  <i className="fas fa-plus" />
                )}
              </button>

              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full">
                <i className="fas fa-thumbs-up" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full">
                <i className="fas fa-share" />
              </button>
            </div>

            <button
              onClick={() => navigate(`/${id}`)}
              className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm"
            >
              Edit
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Movie;
