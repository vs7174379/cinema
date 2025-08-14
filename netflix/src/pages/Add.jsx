import React, { useState } from "react";

export default function Add() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    releaseDate: "",
    poster: "",
    trailerUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Listing:", formData);
    // API call to save changes goes here
  };

  return (
    <div className="h-full bg-gray-900/20 backdrop-blur-md glass text-white p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-2xl"
      >
        <h1 className="text-2xl font-bold mb-6">Add New Listing</h1>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
            rows="4"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />
          <input
            type="url"
            name="poster"
            placeholder="Poster Image URL"
            value={formData.poster}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />
          <input
            type="url"
            name="videoUrl"
            placeholder="Video URL"
            value={formData.videoUrl}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/20 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-lg font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
