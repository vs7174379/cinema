import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    genre: "", // <-- string here (convert to array on submit)
    releaseDate: "",
    duration: 0,
    language: "English",
    poster: "",
    backdrop: "",
    trailerUrl: "",
    cast: [
      {
        name: "",
        role: "",
        image: "",
      },
    ],
    rating: 0,
    isFeatured: false,
  });

  // Handle normal inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle cast input change
  const handleCastChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCast = [...formData.cast];
    updatedCast[index][name] = value;
    setFormData({ ...formData, cast: updatedCast });
  };

  // Add new cast member
  const addCastMember = () => {
    setFormData({
      ...formData,
      cast: [...formData.cast, { name: "", role: "", image: "" }],
    });
  };

  // Remove cast member
  const removeCastMember = (index) => {
    const updatedCast = formData.cast.filter((_, i) => i !== index);
    setFormData({ ...formData, cast: updatedCast });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      genre: formData.genre.split(",").map((g) => g.trim()), // convert to array
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}show/addMovie`, payload);
      navigate("/browser"); // ✅ use navigate instead of redirect()
    } catch (error) {
      console.error("Error saving movie:", error);
    }
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

          {/* Cast Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold mt-6">Cast</h2>
            {formData.cast.map((member, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-2 items-center"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Actor Name"
                  value={member.name}
                  onChange={(e) => handleCastChange(index, e)}
                  className="p-2 rounded bg-white/20 focus:outline-none"
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={member.role}
                  onChange={(e) => handleCastChange(index, e)}
                  className="p-2 rounded bg-white/20 focus:outline-none"
                />
                <input
                  type="url"
                  name="image"
                  placeholder="Image URL"
                  value={member.image}
                  onChange={(e) => handleCastChange(index, e)}
                  className="p-2 rounded bg-white/20 focus:outline-none"
                />
                {formData.cast.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCastMember(index)}
                    className="col-span-3 text-red-400 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCastMember}
              className="text-blue-400 hover:text-blue-600 text-sm"
            >
              + Add Cast Member
            </button>
          </div>
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
