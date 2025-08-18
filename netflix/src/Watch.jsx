import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Player from "@vimeo/player";




const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://cinema-flame-seven.vercel.app/api/user/profile`, {
          method: "GET",
          credentials: "include", // sends cookies
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setUserId(data.user._id);
        
      } catch (err) {
        console.error(err.message);
        setUserId(null);
      }
    };

    fetchProfile();
  }, []);

    useEffect(() => {
      const iframe = document.getElementById("vimeo-player");
      if (!iframe) return;

      const player = new Player(iframe);

      // Listen for playback progress
      player.on("timeupdate", async (data) => {
        console.log("Watched:", data.seconds);

        try {
          await axios.post(`${import.meta.env.VITE_API_URL}user/continue-watching`, {
            movieId: movie._id,
            userId: userId,
            progress: data.seconds,
          });
        } catch (err) {
          console.error("Error saving progress:", err);
        }
      });

      return () => {
        player.unload(); // cleanup when component unmounts
      };
    }, [movie._id, userId]);

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

    if (loading)
      return (
        <div className="flex items-center justify-center h-screen bg-black text-white text-lg">
          Loading...
        </div>
      );

    if (error)
      return (
        <div className="flex items-center justify-center h-screen bg-black text-white text-lg">
          Error: {error}
        </div>
      );

    if (!movie)
      return (
        <div className="flex items-center justify-center h-screen bg-black text-white text-lg">
          No movie found
        </div>
      );

    // Convert normal YouTube watch links to embed links
    const getEmbedUrl = (url) => {
      if (url.includes("youtube.com/watch")) {
        const videoId = new URL(url).searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes("youtu.be")) {
        const videoId = url.split("/").pop();
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url; // if already embed link or MP4
    };

    return (
      <div className="bg-black py-10 w-full  overflow-hidden ">


        {/* Video player */}
        <div className="absolute top-0 flex-1 flex h-full w-full ">

          {movie.trailerUrl && movie.trailerUrl.includes("youtube") ? (
            <iframe
              id="vimeo-player"
              className="w-full h-full"
              src={`${getEmbedUrl(movie.trailerUrl)}?autoplay=1&controls=1&modestbranding=1&rel=0`}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : movie.trailerUrl ? (
            <video className="w-full h-full object-cover" controls autoPlay>
              <source src={movie.trailerUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>

      </div>
    );
  };

  export default Watch;
