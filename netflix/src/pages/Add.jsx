import axios from "axios";
import React, { useState } from "react";

export default function Add() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    genre: [],              // array of strings
    releaseDate: "",        // will be a string from input (convert to Date when sending)
    duration: 0,
    language: "English",    // default value same as backend
    poster: "",
    backdrop: "",
    trailerUrl: "",
    cast: [
      {
        name: "",
        role: "",
        image: ""
      }
    ],                      // array of objects
    rating: 0,              // default
    isFeatured: false       // default
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...formData,
    genre: formData.genre.split(",").map(g => g.trim()), // convert to array
  };

  await axios.post("/api/movies", payload);
};


  return (
    <div className="h-full bg-gray-900/20 backdrop-blur-md glass text-white p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold mb-6">Add New Movie</h1>

        <div className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
            required
          />

          {/* Type */}
          <input
            type="text"
            name="type"
            placeholder="Type (Movie / Series)"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
            rows="4"
            required
          />

          {/* Genre (comma separated) */}
          <input
            type="text"
            name="genre"
            placeholder="Genre (comma separated)"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />

          {/* Release Date */}
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />

          {/* Duration */}
          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />

          {/* Language */}
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={formData.language}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />

          {/* Poster */}
          <input
            type="url"
            name="poster"
            placeholder="Poster Image URL"
            value={formData.poster}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />

          {/* Backdrop */}
          <input
            type="url"
            name="backdrop"
            placeholder="Backdrop Image URL"
            value={formData.backdrop}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />

          {/* Trailer URL */}
          <input
            type="url"
            name="trailerUrl"
            placeholder="Trailer URL"
            value={formData.trailerUrl}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-lg font-semibold"
        >
          Save Movie
        </button>
      </form>
    </div>
  );

}
