import React, { use, useEffect,useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const mockShow = {
    title: "The Lunar Codes",
    year: 2024,
    duration: "2h 3m",
    rating: "8.6",
    description:
        "A tense sci-fi thriller where a group of engineers race to repair an orbital gateway while political and corporateforces collide.",
    episodes: [
        { id: 1, title: "Episode 1 — Launch", length: "42m" },
        { id: 2, title: "Episode 2 — Drift", length: "45m" },
        { id: 3, title: "Episode 3 — Breach", length: "36m" },
    ],
};

const recommendations = new Array(10).fill(0).map((_, i) => ({
    id: i + 1,
    title: `Recommended ${i + 1}`,
    year: 2018 + (i % 7),
    thumb: `https://picsum.photos/seed/rec-${i + 1}/400/240`,
}));

function IconButton({ children, label, onClick }) {
    return (
        <button onClick={onClick}
            className="flex items-center gap-2 px-3 py-2 bg-white/6 hover:bg-white/10 rounded-md backdrop-blur text-sm"
            aria-label={label}>
            {children}
            <span className="text-sm">{label}</span>
        </button>
    );
}

export default function WatchPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`https://cinemo-ashy.vercel.app/api/show/movie/${id}`);
                setMovie(response.data.movie);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchMovie();
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

    const [playing, setPlaying] = useState(false);
    const [currentEpisode, setCurrentEpisode] = useState(mockShow.episodes[0]);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [liked, setLiked] = useState(false);

    const videoRef = useRef(null);
    const progressRef = useRef(null);
    const [time, setTime] = useState({ current: 0, total: 0 });

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;

        const onLoaded = () => setTime((t) => ({ ...t, total: Math.floor(v.duration) }));
        const onTime = () => setTime((t) => ({ ...t, current: Math.floor(v.currentTime) }));

        v.addEventListener("loadedmetadata", onLoaded);
        v.addEventListener("timeupdate", onTime);

        return () => {
            v.removeEventListener("loadedmetadata", onLoaded);
            v.removeEventListener("timeupdate", onTime);
        };
    }, [currentEpisode]);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        if (playing) v.play(); else v.pause();
    }, [playing]);

    function togglePlay() {
        setPlaying((p) => !p);
    }

    function onSeek(e) {
        const v = videoRef.current;
        if (!v) return;
        const rect = progressRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = Math.min(Math.max(clickX / rect.width, 0), 1);
        v.currentTime = ratio * v.duration;
    }

    function formatSeconds(sec) {
        if (!sec && sec !== 0) return "--:--";
        const m = Math.floor(sec / 60)
            .toString()
            .padStart(2, "0");
        const s = Math.floor(sec % 60)
            .toString()
            .padStart(2, "0");
        return `${m}:${s}`;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-100">
            <div className="max-w-[1200px] mx-auto px-4 py-6">
                {/* Layout grid: main player + sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Player (spans two columns on large screens) */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative bg-black rounded-xl overflow-hidden shadow-xl">
                            <video ref={videoRef} className="w-full h-[56vh] bg-black object-cover" src={`${movie.url}`}
                                poster="https://picsum.photos/seed/poster/1200/675" onClick={togglePlay} />

                            {/* Overlay controls */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                                    <button onClick={togglePlay}
                                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-full backdrop-blur"
                                        aria-label={playing ? "Pause" : "Play"}>
                                        {playing ? "Pause" : "Play"}
                                    </button>
                                </div>

                                {/* Bottom control bar */}
                                <div className="absolute left-0 right-0 bottom-0 p-4 pointer-events-auto">
                                    <div ref={progressRef} onClick={onSeek} className="h-2 bg-white/10 rounded-full relative cursor-pointer">
                                        <div className="h-2 bg-white rounded-full" style={{
                                            width: `${(time.current / Math.max(time.total, 1)) *
                                                100}%`
                                        }} />
                                    </div>

                                    <div className="mt-2 flex items-center justify-between text-sm text-slate-300">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white">{formatSeconds(time.current)}</span>
                                                <span>/</span>
                                                <span>{formatSeconds(time.total)}</span>
                                            </div>

                                            <div className="hidden sm:flex items-center gap-2">
                                                <button className="px-2 py-1 bg-white/6 rounded">CC</button>
                                                <button className="px-2 py-1 bg-white/6 rounded">Subtitles</button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setPlaying(false)}
                                                className="px-2 py-1 bg-white/6 rounded"
                                            >
                                                Stop
                                            </button>
                                            <button onClick={() => {
                                                const v = videoRef.current;
                                                if (v) v.requestFullscreen?.();
                                            }}
                                                className="px-2 py-1 bg-white/6 rounded"
                                            >
                                                Fullscreen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Title and actions */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-semibold">{movie.title}</h1>
                                <div className="text-slate-400 mt-1 text-sm">
                                    {movie.year} • {movie.duration} • ⭐ {movie.rating}
                                </div>
                                <p className="mt-3 text-slate-300 max-w-2xl">{movie.description}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <IconButton label={isInWatchlist ? "In Watchlist" : "+ Watchlist"} onClick={() => setIsInWatchlist((s) =>
                                    !s)}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                        <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                </IconButton>

                                <IconButton label={liked ? "Liked" : "Like"} onClick={() => setLiked((l) => !l)}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M20.8 8.6c0 6.3-8.8 11-8.8 11s-8.8-4.7-8.8-11a5 5 0 0 1 9.8-2.2A5 5 0 0 1 20.8 8.6z"
                                            stroke="currentColor" strokeWidth="1" />
                                    </svg>
                                </IconButton>

                                <IconButton label="Download" onClick={() => alert('Download started (mock)')}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                        <path d="M8 11l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                        <path d="M21 21H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                </IconButton>
                            </div>
                        </div>

                        {/* Episode selector */}
                        <div className="bg-white/3 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Episodes</h3>
                                <div className="text-sm text-slate-400">Season 1 • {mockShow.episodes.length} episodes</div>
                            </div>

                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {mockShow.episodes.map((ep) => (
                                    <button key={ep.id} onClick={() => setCurrentEpisode(ep)}
                                        className={`p-2 rounded-md text-left hover:bg-white/6 ${currentEpisode.id === ep.id ? "bg-white/6 border" : ""
                                            }`}
                                    >
                                        <div className="font-medium">{ep.title}</div>
                                        <div className="text-sm text-slate-400">{ep.length}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Comments (simple mock) */}
                        <div className="bg-white/3 p-4 rounded-lg">
                            <h3 className="text-lg font-medium">Comments</h3>
                            <div className="mt-3 space-y-3">
                                <div className="p-3 bg-white/2 rounded">
                                    <div className="flex items-center justify-between text-sm text-slate-200">
                                        <strong>Akira</strong>
                                        <span className="text-xs text-slate-400">2 days ago</span>
                                    </div>
                                    <p className="mt-1 text-slate-300 text-sm">Loved the cinematography in episode 2 — the spacewalk scene was
                                        intense.</p>
                                </div>

                                <div className="p-3 bg-white/2 rounded">
                                    <div className="flex items-center justify-between text-sm text-slate-200">
                                        <strong>Priya</strong>
                                        <span className="text-xs text-slate-400">a week ago</span>
                                    </div>
                                    <p className="mt-1 text-slate-300 text-sm">Great pacing. Hoping for more tech details next season.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column: details + recommendations */}
                    <aside className="space-y-4">
                        <div className="bg-white/3 p-4 rounded-lg sticky top-6">
                            <h4 className="font-semibold">Details</h4>
                            <ul className="mt-2 text-sm text-slate-300 space-y-1">
                                <li>Genre: Sci-fi • Thriller</li>
                                <li>Cast: R. Kaur, M. Singh, J. Patel</li>
                                <li>Director: A. Sharma</li>
                                <li>Languages: English, Hindi (dub)</li>
                            </ul>
                        </div>

                        <div className="bg-white/3 p-4 rounded-lg">
                            <h4 className="font-semibold">More like this</h4>
                            <div className="mt-3 overflow-x-auto flex gap-3 py-2">
                                {recommendations.map((r) => (
                                    <div key={r.id} className="min-w-[160px] shrink-0">
                                        <img src={r.thumb} alt={r.title} className="w-full h-24 object-cover rounded-md" />
                                        <div className="mt-2 text-sm">
                                            <div className="font-medium">{r.title}</div>
                                            <div className="text-xs text-slate-400">{r.year}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/3 p-4 rounded-lg">
                            <h4 className="font-semibold">Watch Options</h4>
                            <div className="mt-2 flex flex-col gap-2">
                                <button className="px-3 py-2 bg-white/6 rounded">Watch in 4K</button>
                                <button className="px-3 py-2 bg-white/6 rounded">Audio Tracks</button>
                                <button className="px-3 py-2 bg-white/6 rounded">Subtitles</button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}