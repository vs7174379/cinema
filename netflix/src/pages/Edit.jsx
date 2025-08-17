import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    genre: "",
    releaseDate: "",
    duration: 0,
    language: "",
    poster: "",
    backdrop: "",
    trailerUrl: "",
    rating: 0,
    cast: [{ name: "", role: "", image: "" }],
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch movie details from backend and pre-fill inputs
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`https://cinema-flame-seven.vercel.app/api/show/movi/${id}`);
        const movie = res.data.movie;

        setFormData({
          title: movie.title || "",
          type: movie.type || "",
          description: movie.description || "",
          genre: movie.genre?.join(", ") || "",
          releaseDate: movie.releaseDate ? movie.releaseDate.split("T")[0] : "",
          duration: movie.duration || 0,
          language: movie.language || "",
          poster: movie.poster || "",
          backdrop: movie.backdrop || "",
          trailerUrl: movie.trailerUrl || "",
          rating: movie.rating || 0,
          cast: movie.cast?.length ? movie.cast : [{ name: "", role: "", image: "" }],
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // ✅ Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle cast inputs
  const handleCastChange = (index, e) => {
    const { name, value } = e.target;
    const updatedCast = [...formData.cast];
    updatedCast[index][name] = value;
    setFormData({ ...formData, cast: updatedCast });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      genre: formData.genre.split(",").map((g) => g.trim()), // Convert back to array
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}show/${id}`, payload);
      navigate("/browser"); // redirect after update
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  if (loading) return <p className="text-white">Loading movie details...</p>;

  return (
    <div className="min-h-screen  text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/60 backdrop-blur-md   p-6 rounded-xl w-full max-w-2xl space-y-4"
      >
        <h1 className="text-2xl font-bold">Edit Movie</h1>

        {/* ✅ Now all inputs will show previous values */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Movie Title"
          className="w-full p-3 rounded bg-gray-700"
        />

        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type (Movie / Series)"
          className="w-full p-3 rounded bg-gray-700"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 rounded bg-gray-700"
        />

        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre (comma separated)"
          className="w-full p-3 rounded bg-gray-700"
        />

        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-700"
        />

        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (minutes)"
          className="w-full p-3 rounded bg-gray-700"
        />

        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          placeholder="Language"
          className="w-full p-3 rounded bg-gray-700"
        />

        <input
          type="url"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
          placeholder="Poster URL"
          className="w-full p-3 rounded bg-gray-700"
        />

        <input
          type="url"
          name="backdrop"
          value={formData.backdrop}
          onChange={handleChange}
          placeholder="Backdrop URL"
          className="w-full p-3 rounded bg-gray-700"
        />

        <input
          type="url"
          name="trailerUrl"
          value={formData.trailerUrl}
          onChange={handleChange}
          placeholder="Trailer URL"
          className="w-full p-3 rounded bg-gray-700"
        />

        {/* ✅ Cast Section */}
        <div>
          <h2 className="text-lg font-semibold">Cast</h2>
          {formData.cast.map((member, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mt-2">
              <input
                type="text"
                name="name"
                value={member.name}
                onChange={(e) => handleCastChange(index, e)}
                placeholder="Actor Name"
                className="p-2 rounded bg-gray-700"
              />
              <input
                type="text"
                name="role"
                value={member.role}
                onChange={(e) => handleCastChange(index, e)}
                placeholder="Role"
                className="p-2 rounded bg-gray-700"
              />
              <input
                type="url"
                name="image"
                value={member.image}
                onChange={(e) => handleCastChange(index, e)}
                placeholder="Image URL"
                className="p-2 rounded bg-gray-700"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 p-3 rounded font-bold"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
}
