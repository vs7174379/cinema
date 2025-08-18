import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Player from "@vimeo/player";

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://cinema-flame-seven.vercel.app/api/user/profile`,
          { method: "GET", credentials: "include" }
        );
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUserId(data.user._id);
      } catch (err) {
        console.error(err.message);
        setUserId(null);
      }
    };
    fetchProfile();
  }, []);

  // Fetch movie by ID
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

  // Track progress for Vimeo / YouTube / MP4
  useEffect(() => {
    if (!movie || !userId) return;

    let player;

    // Vimeo
    if (movie.trailerUrl?.includes("vimeo.com")) {
      const iframe = document.getElementById("vimeo-player");
      if (iframe) {
        player = new Player(iframe);
        player.on("timeupdate", async (data) => {
          await saveProgress(data.seconds);
        });
      }
    }

    // MP4
    else if (movie.trailerUrl?.endsWith(".mp4") && videoRef.current) {
      const videoEl = videoRef.current;
      const handleTimeUpdate = async () => {
        await saveProgress(videoEl.currentTime);
      };
      videoEl.addEventListener("timeupdate", handleTimeUpdate);
      return () => videoEl.removeEventListener("timeupdate", handleTimeUpdate);
    }

    // YouTube
    else if (movie.trailerUrl?.includes("youtube")) {
      window.onYouTubeIframeAPIReady = () => {
        player = new window.YT.Player("youtube-player", {
          events: {
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setInterval(async () => {
                  const seconds = player.getCurrentTime();
                  await saveProgress(seconds);
                }, 5000); // every 5 sec
              }
            },
          },
        });
      };

      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    }

    async function saveProgress(seconds) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}user/continue-watching`, {
          movieId: movie._id,
          userId,
          progress: seconds,
        });
      } catch (err) {
        console.error("Error saving progress:", err);
      }
    }

    return () => {
      if (player && player.unload) player.unload();
    };
  }, [movie, userId]);

  if (loading)
    return <div className="flex items-center justify-center h-screen bg-black text-white">Loading...</div>;

  if (error)
    return <div className="flex items-center justify-center h-screen bg-black text-white">Error: {error}</div>;

  if (!movie)
    return <div className="flex items-center justify-center h-screen bg-black text-white">No movie found</div>;

  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    } else if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    }
    return url;
  };

  return (
    <div className="bg-black w-full h-screen flex justify-center items-center">
      {movie.trailerUrl?.includes("youtube") ? (
        <iframe
          id="youtube-player"
          className="w-full h-full"
          src={getEmbedUrl(movie.trailerUrl)}
          title={movie.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : movie.trailerUrl?.includes("vimeo") ? (
        <iframe
          id="vimeo-player"
          className="w-full h-full"
          src={movie.trailerUrl}
          title={movie.title}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      ) : movie.trailerUrl?.endsWith(".mp4") ? (
        <video ref={videoRef} className="w-full h-full object-cover" controls autoPlay>
          <source src={movie.trailerUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}
    </div>
  );
};

export default Watch;
