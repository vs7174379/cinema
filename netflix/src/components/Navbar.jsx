import React, { useState, useRef, useEffect } from 'react';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    
    const menuRef = useRef(null);
     const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const user= await fetchUserDetails();
      setUser(user);
    };
    getUser();
  }, []);
     

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
                        {['browse','Movies', 'TV Series', 'Animation', 'Thriller', 'Drama', 'More'].map((item) => (
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
                <a href="/more" className="px-4 py-1 rounded-full hover:bg-green-100 hover:text-black transition cursor-pointer">More</a>

               
            </div>

           
        </div>
    );
};

export default Navbar;
