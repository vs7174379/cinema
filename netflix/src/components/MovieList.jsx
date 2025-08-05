import React, { useEffect, useId, useRef, useState } from 'react';
import Cards from './Cards';
import { Droplet, Play, Plus } from 'lucide-react';


const MovieList = ({ title, movies, searchMovies = false }) => {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActive(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setActive(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : 'auto';
  }, [active]);

  return (
    <div>
      

     

      {/* You Might Like - 1 */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold px-2">{title}</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar p-2">
            {movies.map((p, index) => (
              <Cards video={p} key={index}/>
            ))}
          </div>
        </div>

      

      
    </div>
  );
};

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default MovieList;
