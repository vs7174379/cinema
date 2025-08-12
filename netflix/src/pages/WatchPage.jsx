import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const WatchPage = () => {
  const [showUI, setShowUI] = useState(true);
  const timerRef = useRef(null);

  // Movie data from given JSON
  const movie = {
    _id: "6894dd728a55c95d518c8738",
    title: "Kuch Kuch Hota Hai",
    backdrop:
      "https://image.tmdb.org/t/p/original/iQJZMLr5cdn7Al2Av4V1VEzPDoQ.jpg",
    cast: [
      { name: "Shah Rukh Khan" },
      { name: "Kajol" },
      { name: "Rani Mukerji" },
      { name: "Sana Saeed" },
      { name: "Farida Jalal" },
      { name: "Salman Khan" },
      { name: "Johny Lever" },
      { name: "Archana Puran Singh" },
      { name: "Anupam Kher" },
      { name: "Reema Lagoo" },
    ],
    description:
      "Per her mother's last wish, an 8 year old girl sets out to reunite her father with his college best friend who was in love with him.",
    duration: 185,
    genre: ["Romance", "Drama", "Comedy"],
    language: "hi",
    poster:
      "https://image.tmdb.org/t/p/w500/wjTPPVRz4ZA1GgCNnvcBTBc9aEF.jpg",
    rating: 7.47,
    releaseDate: "1998-10-16T00:00:00.000Z",
    trailerUrl: "https://www.youtube.com/embed/IxnUHB64NcU",
  };

  // Inactivity detection
  useEffect(() => {
    const resetTimer = () => {
      if (!showUI) setShowUI(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowUI(false), 3000);
    };

    const events = ["mousemove", "click", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, [showUI]);

  return (
    <div className="bg-black text-white h-screen relative overflow-hidden top-36">
      {/* Trailer Video */}
      <iframe
        className="w-full h-full"
        src={`${movie.trailerUrl}?autoplay=1&controls=1`}
        title={movie.title}
        frameBorder="0"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* Top Bar */}
      <div
        className={`absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-500 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link to="/movies" className="font-bold hover:underline">
          ⬅ Back
        </Link>
        <h1 className="text-xl font-semibold">{movie.title}</h1>
        <div></div>
      </div>

      {/* Bottom Info */}
      <div
        className={`absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500 ${
          showUI ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <p className="text-gray-300 text-sm mt-1">
          {new Date(movie.releaseDate).getFullYear()} • {movie.genre.join(", ")}{" "}
          • {movie.duration} min • Rating: {movie.rating.toFixed(1)}
        </p>
        <p className="mt-3 text-gray-200 max-w-2xl">{movie.description}</p>

        {/* Cast */}
        <div className="mt-4">
          <h3 className="font-semibold">Cast:</h3>
          <p className="text-gray-300 text-sm">
            {movie.cast.map((actor) => actor.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
