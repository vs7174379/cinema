import { Play } from 'lucide-react';

const continueWatchingData = [
  {
    title: "King of Kotha",
    time: "2h 43m left",
    image: "https://media-cache.cinematerial.com/p/500x/qy40tpve/king-of-kotha-indian-movie-poster.jpg?v=1733437134", // replace with actual poster URL
    lang: "Malayalam"
  },
  {
    title: "Humraaz",
    time: "2h 38m left",
    image: "https://m.media-amazon.com/images/M/MV5—Humraaz_poster.jpg"
  },
  {
    title: "Hai Junoon!",
    time: "26m left",
    image: "https://via.placeholder.com/300x170",
    season: "S1 E1"
  },
  {
    title: "Shadaa",
    time: "1h 36m left",
    image: "https://via.placeholder.com/300x170"
  },
  {
    title: "Kull",
    time: "29m left",
    image: "https://via.placeholder.com/300x170",
    season: "S1 E1"
  },
  {
    title: "Game of Greed",
    time: "36m left",
    image: "https://via.placeholder.com/300x170",
    season: "S1 E1"
  },
  {
    title: "Mere Husband Ki Biwi",
    time: "2h 3m left",
    image: "https://via.placeholder.com/300x170"
  },
  {
    title: "Saba Nayagan",
    time: "2h 16m left",
    image: "https://via.placeholder.com/300x170",
    lang: "Hindi"
  },
  {
    title: "Sweetheart!",
    time: "2h 14m left",
    image: "https://via.placeholder.com/300x170",
    lang: "Hindi"
  },
  {
    title: "The Legend of Hanuman",
    time: "16m left",
    image: "https://via.placeholder.com/300x170",
    season: "S6 E1"
  }
];

export default function MyList({head}) {
  return (
    <div className="p-6  min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-6">{head} </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {continueWatchingData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="relative group">
              <img src={item.image} alt={item.title} className="rounded-md object-cover w-full h-[170px]" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                <Play className="w-10 h-10 text-white" />
              </div>
              <div className="h-1 bg-blue-600 absolute bottom-0 left-0 w-2/3"></div>
            </div>
            <div>
              <p className="text-sm font-semibold">{item.season || item.title}</p>
              {item.season && <p className="text-sm">{item.title}</p>}
              <p className="text-xs text-gray-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
