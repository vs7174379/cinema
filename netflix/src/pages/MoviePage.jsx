import React, { useState } from "react";
import SearchBar from "./SearchBar";

const movies = [
  { title: "Inception" },
  { title: "Interstellar" },
  { title: "The Dark Knight" },
  { title: "Avatar" },
];

export default function MoviePage() {
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
