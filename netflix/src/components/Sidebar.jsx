import React, { useEffect, useRef } from 'react'
const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};


const Sidebar = ({movies,upcoming}) => {
    const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const scrollDiv = scrollRef.current;
      if (scrollDiv) {
        scrollDiv.scrollBy({ top: 50, behavior: 'smooth' });
      }
    }, 3000); // Scroll every second

    return () => clearInterval(interval);
  }, []);
  return (
      <aside className="sticky hidden xl:flex top-24 h-fit flex-col gap-4 w-full xl:w-1/4">
        {/* Trending Now */}
        <div  ref={scrollRef} className="glass h-80 overflow-y-auto no-scrollbar rounded-3xl bg-black/20">
          <h2 className="text-xl font-semibold px-4 pt-4 pb-2 bg-black/30 backdrop-blur-sm sticky top-0 z-50">
            Trending Now
          </h2>
          <div className="space-y-2 p-4">
            {movies.map((p, index) => (
              <div
                key={`trending-${index}`}
                className="h-32 bg-cover bg-top relative rounded-2xl shadow-lg"
                style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w780${p.backdrop_path}')` }}

              >
                <div className="absolute bottom-0 w-full bg-black/40 p-2 rounded-b-2xl backdrop-blur-md">
                  <p className="font-bold text-sm">{p.title}</p>
                  <p className="text-xs text-gray-300">{p.genre_ids.map(id => genreMap[id]).join(", ")} -{p.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Trailer */}
        <div  className="glass h-80 overflow-y-auto no-scrollbar rounded-3xl bg-black/20">
          <h2 className="text-xl font-semibold px-4 pt-4 pb-2 bg-black/30 backdrop-blur-sm sticky top-0 z-50">
            New Trailer
          </h2>
          <div className="space-y-2 p-4">
            {upcoming.map((p, index) => (
              <div
                key={`trending-${index}`}
                className="h-32 bg-cover bg-top relative rounded-2xl shadow-lg"
                style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w780${p.backdrop_path}')` }}

              >
                <div className="absolute bottom-0 w-full bg-black/40 p-2 rounded-b-2xl backdrop-blur-md">
                  <p className="font-bold text-sm">{p.title}</p>
                  <p className="text-xs text-gray-300">{p.genre_ids.map(id => genreMap[id]).join(", ")} -{p.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
  )
}

export default Sidebar