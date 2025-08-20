import { LogOut } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

import axios from 'axios';
import Cards from './Cards';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);
    const [movies, setMovies] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [query, setQuery] = useState("");




    const fetchMovies = async (value) => {
        try {
            const res = await axios.get('https://cinema-flame-seven.vercel.app/api/show/movie');

            if (res.data.success) {
                const filtered = res.data.movies.filter((movie) =>
                    movie.title.toLowerCase().includes(value.toLowerCase())
                );

                setMovies(filtered);
                setShowOverlay(filtered.length > 0);
            } else {
                setMovies([]);
                setShowOverlay(false);
            }
        } catch (err) {
            console.error("Error fetching movies:", err);
            setMovies([]);
            setShowOverlay(false);
        }
    };




    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim().length > 1) {
            fetchMovies(value);
        } else {
            setMovies([]);
            setShowOverlay(false);
        }
    };


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`https://cinema-flame-seven.vercel.app/api/user/profile`, {
                    method: "GET",
                    credentials: "include", // sends cookies
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const data = await res.json();
                setUser(data.user);
            } catch (err) {
                console.error(err.message);
                setUser(null);
            }
        };

        fetchProfile();
    }, []);
    const handleLogout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}user/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            window.location.href = '/';
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };




    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-md flex flex-col  md:flex-row md:items-center md:justify-evenly p-4 gap-2 ">
            <div className='flex items-center justify-center'>
                {/* Navigation Dropdown - Mobile */}
                <div className="md:hidden mr-5">

                    <div className="relative">
                        <select className="  appearance-none  text-gray-800 font-medium border bg-white border-gray-300  rounded-lg px-4 py-2 pr-6  shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                            {['browse', 'Movies', 'TV Series', 'Animation', 'Thriller', 'Drama', 'More'].map((item) => (
                                <option key={item}>{item}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-800">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Profile Dropdown */}
                <div className="    relative inline-block text-right" ref={menuRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center space-x-2 bg-gray-500  text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
                    >
                        <img
                            src={user?.avatar || 'https://i.pravatar.cc/150?img=32'}
                            alt="User"
                            className="w-6 h-6 rounded-full"
                        />
                        <span className="hidden sm:inline">{user?.fullName || 'User'}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {open && (
                        <div className="origin-top-left absolute text-center mt-2 w-48  rounded-md shadow-lg bg-white ring-1 ring-black/10 z-50">
                            <div className="py-1 text-gray-700 ">
                                <a href="/profile" className="block px-4 py-2 hover:bg-gray-100 ">My Profile</a>
                                <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                                <a href="/mylist" className="block px-4 py-2 hover:bg-gray-100">Watchlist</a>
                                <a href="/new" className="block px-4 py-2 hover:bg-gray-100">Add Content</a>
                                <button className="w-full text-center px-4 py-2 hover:bg-gray-100">Logout</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Search Bar */}
            <input
                value={query}
                onChange={handleChange}
                type="text"
                placeholder="Search..."
                className="w-72 px-4 py-2 rounded-full bg-gray-900 text-white focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            {/* Overlay */}
            {showOverlay && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-start pt-20">
                    <div className="bg-white p-6 rounded-lg max-h-[80vh] w-[90%] max-w-5xl overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Search Results</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {movies.map((movie, idx) => (
                                <Cards key={idx} movie={movie} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Navigation Buttons - Desktop */}
            <div className="hidden md:flex flex-wrap justify-center gap-2 text-sm text-yellow-400 font-semibold">
                <a href="/browser" className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer">Browse</a>
                <a href="/movies" className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer">Movies</a>
                <a href="/tv-series" className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer">TV Series</a>
                <a href="/animation" className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer">Animation</a>
                <a href="/thriller" className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer">Thriller</a>
                <a href="/drama" className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer">Drama</a>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm"
                >
                    <LogOut size={16} /> Logout
                </button>
                <a href="/Sbskripsn" className="relative px-6 py-3 rounded-[15px] bg-[#f3ff07] text-[#212121] font-extrabold text-lg shadow-[4px_8px_19px_-3px_rgba(0,0,0,0.27)] transition-all duration-300 overflow-hidden 
  before:content-[''] before:absolute before:top-0 before:left-0 before:h-full before:w-0 before:rounded-[15px] before:bg-[#0df4ec] before:-z-10 before:shadow-[4px_8px_19px_-3px_rgba(0,0,0,0.27)] before:transition-all before:duration-300 hover:text-[#e8e8e8] hover:before:w-full">Subscribe</a>


            </div>



        </div>
    );
};

export default Navbar;
