import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-youtube";

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://cinema-flame-seven.vercel.app/api/show/movi/${id}`
        );

        setMovie(response.data.movie || response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (movie?.trailerUrl && videoRef.current) {
      let type = "video/mp4";
      let src = movie.trailerUrl;

      // Detect YouTube URL
      if (src.includes("youtube.com") || src.includes("youtu.be")) {
        type = "video/youtube";
      }

      if (!playerRef.current) {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: true,
          preload: "auto",
          fluid: true,
          techOrder: ["youtube", "html5"],
          sources: [
            {
              src,
              type,
            },
          ],
        });
      } else {
        playerRef.current.src({ src, type });
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [movie]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>

      {movie.trailerUrl && (
        <div data-vjs-player>
          <video
            ref={videoRef}
            className="video-js vjs-big-play-centered"
            playsInline
          />
        </div>
      )}
    </div>
  );
};

export default Watch;
