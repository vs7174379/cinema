import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Player from "@vimeo/player";

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [userId, setUserId] = useState("123"); // replace with real auth userId

  // ✅ Utility: normalize video URLs
  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    } else if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;
    }
    return url;
  };

  // ✅ Fetch movie
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://cinema-flame-seven.vercel.app/api/show/movi/${id}`
        );
        setMovie(res.data.movie || res.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };
    fetchMovie();
  }, [id]);

  // ✅ Vimeo tracking
  useEffect(() => {
    if (!movie || !movie.trailerUrl?.includes("vimeo")) return;

    const iframe = document.getElementById("vimeo-player");
    if (!iframe) return;

    const player = new Player(iframe);

    player.on("timeupdate", async (data) => {
      console.log("Vimeo watched:", data.seconds);
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}user/continue-watching`,
          {
            movieId: movie._id,
            userId,
            progress: data.seconds,
          }
        );
      } catch (err) {
        console.error("Error saving Vimeo progress:", err);
      }
    });

    return () => player.unload();
  }, [movie, userId]);

  // ✅ YouTube tracking
  useEffect(() => {
    if (!movie || !movie.trailerUrl?.includes("youtube")) return;

    // Load YouTube API if not loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player("youtube-player", {
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              // Save progress every 5s
              const interval = setInterval(async () => {
                const time = player.getCurrentTime();
                console.log("YouTube watched:", time);
                try {
                  await axios.post(
                    `${import.meta.env.VITE_API_URL}user/continue-watching`,
                    {
                      movieId: movie._id,
                      userId,
                      progress: time,
                    }
                  );
                } catch (err) {
                  console.error("Error saving YouTube progress:", err);
                }
              }, 5000);

              // Clear interval when paused/stopped
              const stopTracking = () => clearInterval(interval);
              player.addEventListener("onStateChange", (e) => {
                if (e.data !== window.YT.PlayerState.PLAYING) stopTracking();
              });
            }
          },
        },
      });
    };
  }, [movie, userId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen bg-black">
      {movie.trailerUrl?.includes("youtube") ? (
        <iframe
          id="youtube-player"
          className="w-full h-full"
          src={getEmbedUrl(movie.trailerUrl)}
          title={movie.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : movie.trailerUrl?.includes("vimeo") ? (
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
