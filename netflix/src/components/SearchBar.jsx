import React, { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query); // pass query to parent
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-900 text-white rounded-full px-4 py-2 w-full max-w-md mx-auto shadow-lg"
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent outline-none flex-1 px-2"
      />
      <button type="submit" className="text-gray-400 hover:text-yellow-400">
        <Search size={22} />
      </button>
    </form>
  );
}
