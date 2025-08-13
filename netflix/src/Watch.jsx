import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://cinema-flame-seven.vercel.app/api/show/movi/${id}`
        );

        // Check actual API shape
        if (response.data.movie) {
          setMovie(response.data.movie);
        } else {
          setMovie(response.data); // fallback if no "movie" key
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      {movie.trailerUrl && (
      <iframe
              ref={iframeRef}
              className="w-full h-full"
              src={`${movie.trailerUrl.replace('watch?v=', 'embed/')}?autoplay=1&controls=1`}
              title="Movie Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              playsInline
            ></iframe>
      )}
    </div>
  );
};

export default Watch;
