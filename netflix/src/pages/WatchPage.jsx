import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const WatchPage = () => {
    const [showUI, setShowUI] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        const fetchMovi = async () => {
            try {
                const response = await axios.get(`https://cinemo-ashy.vercel.app/api/show/movie/${id}`);
                setMovie(response.data.movie);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchMovi();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                Loading movie details...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                Error: {error}
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                Movie not found.
            </div>
        );
    }



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
            <iframe
                width="100%"
                height="100%"
                src={`${movie.url}?autoplay=1&controls=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>


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
                    <h2 className="text-2xl font-bold">{movie.title}</h2>
                    <p className="text-gray-300 text-sm mt-1">
                        2010 • 2h 28m • {movie.genre}
                    </p>
                    <p className="mt-3 text-gray-200 max-w-2xl">
                        {movie.description || "A mind-bending thriller where dream invasion is the norm."}
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
