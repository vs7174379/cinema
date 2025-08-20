import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Navbar = () => {
  const [allMovies, setAllMovies] = useState([]); // store all movies
  const [movies, setMovies] = useState([]); // filtered movies
  const [query, setQuery] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const debounceRef = useRef(null);
  const overlayRef = useRef(null);

  // Fetch all movies once
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(
          "https://cinema-flame-seven.vercel.app/api/show/movie"
        );
        if (res.data.success) {
          setAllMovies(res.data.movies);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchAll();
  }, []);

  // Close overlay when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        setShowOverlay(false);
      }
    };
    if (showOverlay) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOverlay]);

  // Handle search
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (value.trim().length > 1) {
        const filtered = allMovies.filter((m) =>
          m.title.toLowerCase().includes(value.toLowerCase())
        );
        setMovies(filtered);
        setShowOverlay(filtered.length > 0);
      } else {
        setMovies([]);
        setShowOverlay(false);
      }
    }, 400);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 py-3 shadow-md">
        <h1 className="text-2xl font-extrabold text-yellow-400">PrimeClone</h1>
        <input
          value={query}
          onChange={handleChange}
          type="text"
          placeholder="Search movies..."
          className="w-72 px-4 py-2 rounded-full bg-gray-900 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
        />
      </nav>

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-start pt-20">
          <div
            ref={overlayRef}
            className="bg-white p-6 rounded-lg max-h-[80vh] w-[90%] max-w-5xl overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movies.map((movie, idx) => (
                <div
                  key={idx}
                  className="cursor-pointer rounded-lg overflow-hidden shadow hover:scale-105 transition"
                  onClick={() => setShowOverlay(false)}
                >
                  <img
                    src={
                      movie.poster && movie.poster !== "N/A"
                        ? movie.poster
                        : "https://via.placeholder.com/200x300"
                    }
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-2 text-center">
                    <h3 className="font-semibold text-sm">{movie.title}</h3>
                    <p className="text-xs text-gray-500">{movie.releaseDate}</p>
                  </div>
                </div>
              ))}
            </div>
            {movies.length === 0 && (
              <p className="text-gray-500">No results found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
