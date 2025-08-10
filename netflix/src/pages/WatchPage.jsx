import React, { useState, useEffect } from "react";

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
      {/* Video */}
      <video
        className="w-full h-full object-cover"
        autoPlay
        controls
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      ></video>

      {/* Top Overlay */}
      {showUI && (
        <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
          <a
            href="/movies"
            className="text-white text-lg font-bold hover:underline"
          >
            ⬅ Back
          </a>
          <h1 className="text-xl font-semibold">Inception</h1>
          <div></div>
        </div>
      )}

      {/* Bottom Overlay */}
      {showUI && (
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h2 className="text-2xl font-bold">Inception</h2>
          <p className="text-gray-300 text-sm mt-1">
            2010 • 2h 28m • Sci-Fi, Action
          </p>
          <p className="mt-3 text-gray-200 max-w-2xl">
            A thief who steals corporate secrets through dream-sharing technology is
            tasked with planting an idea into the mind of a CEO.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded">
              ➕ Watchlist
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
              👍 Like
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded">
              🔗 Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchPage;
