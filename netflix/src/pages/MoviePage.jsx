import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";


export default function MoviePage() {
    const [movies, setMovies] = useState([]);
    

    useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://cinema-flame-seven.vercel.app/api/show/movie');
        const data = response.data.movies
        if (response.data.success) {
          setMovies(data);
          
        } else {
          console.error('Failed to fetch movies:', data.message);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }
    fetchMovies();
  }, []);
  const [filtered, setFiltered] = useState(movies);


  const handleSearch = (query) => {
    const results = movies.filter((m) =>
      m.title.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(results);
  };

  return (
    <div className="p-6">
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {filtered.map((m, idx) => (
          <div key={idx} className="p-4 bg-gray-800 rounded-lg text-white">
            {m.title}
          </div>
        ))}
      </div>
    </div>
  );
}
