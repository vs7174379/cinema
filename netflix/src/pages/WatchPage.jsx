import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

const WatchPage = () => {
  const [showUI, setShowUI] = useState(true);

  useEffect(() => {
    let timer;
    const handleMouseMove = () => {
      setShowUI(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowUI(false), 3000);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-black text-white h-screen overflow-hidden relative">
      {/* YouTube Player */}
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/SKJfBo3xMW0?autoplay=1&controls=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>


      {/* Overlays (same as before) */}
      {showUI && (
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between bg-gradient-to-b from-black/80 to-transparent">
          <a href="/movies" className="font-bold hover:underline">⬅ Back</a>
          <h1 className="text-xl font-semibold">Movie Title</h1>
          <div></div>
        </div>
      )}
      {showUI && (
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-2xl font-bold">Movie Title</h2>
          <p className="text-gray-300 text-sm mt-1">2025 • Action</p>
          <p className="mt-3 text-gray-200 max-w-2xl">
            Movie description here...
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchPage;
