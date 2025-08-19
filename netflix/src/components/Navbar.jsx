import { LogOut } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);



    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Movies", href: "/movies" },
        { name: "Subscriptions", href: "/subscription" },
        { name: "Profile", href: "/profile" },
    ];
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

    const handleSaveProfile = (updatedUser) => {
        setUser(updatedUser);
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
                {open && (
                    <div className="mt-4 flex flex-col space-y-3 md:hidden bg-gray-900 p-4 rounded-lg shadow-lg">
                        {menuItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="hover:text-yellow-400 transition"
                                onClick={() => setOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                )}
                {/* Profile Dropdown */}
                <div className="    relative inline-block text-right" ref={menuRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
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
            <div className="flex items-center w-full md:w-[30%] bg-neutral-500 rounded-full px-4 py-2">
                <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none text-sm text-white flex-grow placeholder:text-white"
                />
            </div>

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
                <a href="/Sbskripsn" className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer">Subscribe</a>


            </div>


        </div>
    );
};

export default Navbar;
