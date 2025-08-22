import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
import Cards from './Cards';
import Button from './Button';


const Navbar = () => {
  const [allMovies, setAllMovies] = useState([]); // store all movies
  const [movies, setMovies] = useState([]); // filtered movies
  const [query, setQuery] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const debounceRef = useRef(null);
  const overlayRef = useRef(null);
  const menuRef = useRef(null);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://cinema-flame-seven.vercel.app/api/user/profile`,
          { method: "GET", credentials: "include" }
        );
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

  // Logout
  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}user/logout`, {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch all movies
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(
          "https://cinema-flame-seven.vercel.app/api/show/movie"
        );
        if (res.data.success) setAllMovies(res.data.movies);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchAll();
  }, []);

  // Close search overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        setShowOverlay(false);
      }
    };
    if (showOverlay) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOverlay]);

  // Handle search input
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
        <h1 className="text-2xl font-extrabold text-yellow-400">Cinema</h1>

        <div className="flex items-center justify-center">
          {/* Mobile Dropdown */}
          <div className="md:hidden mr-5">
            <div className="relative">
              <select className="appearance-none text-gray-800 font-medium border bg-white border-gray-300 rounded-lg px-4 py-2 pr-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                {[
                  "browse",
                  "Movies",
                  "TV Series",
                  "Animation",
                  "Thriller",
                  "Drama",
                  "More",
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-800">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="relative inline-block text-right" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
            >
              <img
                src={user?.avatar || "https://i.pravatar.cc/150?img=32"}
                alt="User"
                className="w-6 h-6 rounded-full"
              />
              <span className="hidden sm:inline">{user?.fullName || "User"}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {open && (
              <div className="origin-top-left absolute text-center mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black/10 z-50">
                <div className="py-1 text-gray-700">
                  <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    My Profile
                  </a>
                  <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Settings
                  </a>
                  <a href="/mylist" className="block px-4 py-2 hover:bg-gray-100">
                    Watchlist
                  </a>
                  <a href="/new" className="block px-4 py-2 hover:bg-gray-100">
                    Add Content
                  </a>
                  <onClick={handleLogout} SquidGameCard/>
                </div>
              </div>
            )}
          </div>
        </div>

        <input
          value={query}
          onChange={handleChange}
          type="text"
          placeholder="Search movies..."
          className="w-72 px-4 py-2 rounded-full bg-gray-900 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
        />

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-2 text-sm text-yellow-400 font-semibold">
          <a
            href="/browser"
            className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer"
          >
            Browse
          </a>
          <a
            href="/movies"
            className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer"
          >
            Movies
          </a>
          <a
            href="/tv-series"
            className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer"
          >
            TV Series
          </a>
          <a
            href="/animation"
            className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer"
          >
            Animation
          </a>
          <a
            href="/thriller"
            className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer"
          >
            Thriller
          </a>
          <a
            href="/drama"
            className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer"
          >
            Drama
          </a>

         < onClick={handleLogout} Button/>
            <LogOut size={10} /> Logout
          </Button>

          <a
  href="/Sbskripsn"
  className="relative px-6 py-3 rounded-[15px] bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black font-extrabold text-lg shadow-lg transition-all duration-300 overflow-hidden
             before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:rounded-[15px] 
             before:bg-white/20 before:-z-10 before:transition-all before:duration-300 hover:text-white hover:before:w-full"
>
  Subscribe
</a>

        </div>
      </nav>

      {/* Search Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-start pt-20">
          <div
            ref={overlayRef}
            className="bg-white p-6 rounded-lg max-h-[80vh] w-[90%] max-w-5xl overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movies.map((movie, idx) => (
                <Cards video={movie}/>
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
