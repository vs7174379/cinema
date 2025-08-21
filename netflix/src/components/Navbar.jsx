import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const debounceRef = useRef(null);
  const overlayRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://cinema-flame-seven.vercel.app/api/user/profile`, { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err.message);
        setUser(null);
      }
    };
    fetchProfile();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}user/logout`, { method: 'POST', credentials: 'include' });
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch all movies
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("https://cinema-flame-seven.vercel.app/api/show/movie");
        if (res.data.success) setAllMovies(res.data.movies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchAll();
  }, []);

  // Close overlay on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) setShowOverlay(false);
    };
    if (showOverlay) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOverlay]);

  // Search handler with debounce
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
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-black/90 via-gray-900/80 to-black/90 backdrop-blur-md flex items-center justify-between px-6 py-3 shadow-lg">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-yellow-400 hover:scale-105 transition-transform cursor-pointer">
          Cinema<span className="text-white">Flame</span>
        </h1>

        {/* Navigation Buttons */}
        <div className="hidden md:flex items-center gap-3 text-sm text-yellow-400 font-semibold">
          {['Browse', 'Movies', 'TV Series', 'Animation', 'Thriller', 'Drama'].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase().replace(' ', '-')}`}
              className="px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition-all"
            >
              {item}
            </a>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
          <a
            href="/subscribe"
            className="relative px-6 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-green-400 font-extrabold text-black shadow-lg hover:scale-105 transition-transform"
          >
            Subscribe
          </a>
        </div>

        {/* Profile Dropdown */}
        <div className="relative ml-4" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-all"
          >
            <img
              src={user?.avatar || 'https://i.pravatar.cc/150?img=32'}
              alt="User"
              className="w-8 h-8 rounded-full ring-2 ring-yellow-400"
            />
            <span className="hidden sm:inline">{user?.fullName || 'User'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/10 overflow-hidden z-50 animate-fadeIn">
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</a>
              <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
              <a href="/mylist" className="block px-4 py-2 hover:bg-gray-100">Watchlist</a>
              <a href="/new" className="block px-4 py-2 hover:bg-gray-100">Add Content</a>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative ml-4">
          <input
            value={query}
            onChange={handleChange}
            type="text"
            placeholder="Search movies..."
            className="w-72 px-4 py-2 rounded-full bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none shadow-lg"
          />
        </div>
      </nav>

      {/* Search Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-start pt-20 animate-fadeIn">
          <div
            ref={overlayRef}
            className="bg-white p-6 rounded-lg max-h-[80vh] w-[90%] max-w-6xl overflow-y-auto shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-4 text-yellow-500">Search Results</h2>
            {movies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {movies.map((movie, idx) => (
                  <div
                    key={idx}
                    className="cursor-pointer rounded-lg overflow-hidden shadow hover:scale-105 transition transform"
                    onClick={() => setShowOverlay(false)}
                  >
                    <img
                      src={movie.poster && movie.poster !== "N/A" ? movie.poster : "https://via.placeholder.com/200x300"}
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
            ) : (
              <p className="text-gray-500 text-center mt-4">No results found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
