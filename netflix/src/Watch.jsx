import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Player from "@vimeo/player";

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [userId, setUserId] = useState("123"); // replace with real userId

  // Utility: convert watch links → embed
  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`; // note ?enablejsapi=1
    } else if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    }
    return url;
  };

  // Load movie
  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(`https://cinema-flame-seven.vercel.app/api/show/movi/${id}`);
      setMovie(res.data.movie || res.data);
    };
    fetchMovie();
  }, [id]);

  // Vimeo tracking
  useEffect(() => {
    if (!movie || !movie.trailerUrl) return;

    if (movie.trailerUrl.includes("vimeo")) {
      const iframe = document.getElementById("vimeo-player");
      if (!iframe) return;
      const player = new Player(iframe);

      player.on("timeupdate", async (data) => {
        await axios.post(`${import.meta.env.VITE_API_URL}user/continue-watching`, {
          movieId: movie._id,
          userId,
          progress: data.seconds,
        });
      });

      return () => player.unload();
    }
  }, [movie, userId]);

  // YouTube tracking
  useEffect(() => {
    if (!movie || !movie.trailerUrl.includes("youtube")) return;

    // Dynamically load YouTube API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player("youtube-player", {
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setInterval(async () => {
                const time = player.getCurrentTime();
                await axios.post(`${import.meta.env.VITE_API_URL}user/continue-watching`, {
                  movieId: movie._id,
                  userId,
                  progress: time,
                });
              }, 5000); // save every 5s
            }
          },
        },
      });
    };
  }, [movie, userId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen bg-black">
      {movie.trailerUrl.includes("youtube") ? (
        <iframe
          id="youtube-player"
          className="w-full h-full"
          src={getEmbedUrl(movie.trailerUrl)}
          title={movie.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : movie.trailerUrl.includes("vimeo") ? (
        <iframe
          id="vimeo-player"
          className="w-full h-full"
          src={movie.trailerUrl}
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      ) : (
        <video className="w-full h-full object-cover" controls autoPlay>
          <source src={movie.trailerUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default Watch;
