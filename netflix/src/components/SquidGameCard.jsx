import React from "react";
import { Play, Plus, ThumbsUp } from "lucide-react";


const movies = [
    {
        title: "GOD",
        img: "/card2.jpg",
        duration: "2h 14m",
        rating: "A",
        quality: "HD",
        year: "2023",
        description: "A police officer with a tendency to take justice into his own hands embarks on an intense hunt for a brutal serial killer."
    },
    {
        title: "Daaku Maharaaj",
        img: "/card2.jpg",
        duration: "2h 23m",
        rating: "U/A 16+",
        quality: "HD",
        year: "2024",
        description: "When powerful forces threaten a young girl, a fearless man with a criminal past steps in to protect her and the community from danger."
    },
    {
        title: "Forensic",
        img: "/card2.jpg",
        duration: "2h 12m",
        rating: "U/A 16+",
        quality: "HD",
        year: "2020",
        description: "A pair of officers with history navigate clues from the past, false leads and a ticking clock to nab an elusive serial killer who targets young girls."
    },
    // add more movie data similarly...
];


export default function SquidGameCard() {
    return (
        <div className="bg-black rounded-md text-white min-h-screen">
            {/* Hero Section */}
            <div className="relative">
                <img
                    src="/card2.jpg" // replace with your hero image path
                    alt="HIT: The Third Case"
                    className="w-full h-[400px] rounded-md object-cover"
                />
                <div className="absolute bottom-10 left-10 space-y-4">
                    <h1 className="text-4xl font-bold">HIT: THE THIRD CASE</h1>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center bg-white text-black px-4 py-2 rounded font-semibold">
                            <Play className="mr-2" size={20} /> Play
                        </button>
                        <button className="flex items-center bg-gray-700 bg-opacity-50 px-3 py-2 rounded">
                            <ThumbsUp size={20} />
                        </button>
                        <button className="flex items-center bg-gray-700 bg-opacity-50 px-3 py-2 rounded">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="px-8 py-6 space-y-2 text-gray-300">
                <div className="flex items-center space-x-2 text-sm">
                    <span>2025</span>
                    <span>2h 34m</span>
                    <span className="border border-gray-500 px-1 rounded">HD</span>
                </div>
                <div className="text-sm">
                    Watch in Telugu, Tamil, Malayalam, Kannada, Hindi
                </div>
                <p className="text-sm max-w-2xl">
                    When a link is made between a series of gruesome murders, the police assign
                    Superintendent Arjun Sarkaar to track down the serial killers.
                </p>
                <div className="text-sm">
                    <span className="text-gray-500">Cast:</span>{" "}
                    Nani, Srinidhi Shetty, Rao Ramesh
                </div>
                <div className="text-sm">
                    <span className="text-gray-500">Genres:</span>{" "}
                    Crime Movies, Thriller Movies, Telugu-Language Movies
                </div>
                <div className="text-sm">
                    <span className="text-gray-500">This Movie Is:</span> Violent, Dark
                </div>
            </div>

            {/* More Like This */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-black text-white">
                {movies.map((movie, index) => (
                    <div key={index} className="bg-gray-900 rounded overflow-hidden shadow">
                        <div className="relative">
                            <img
                                src={movie.img}
                                alt={movie.title}
                                className=" h-20 object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-black bg-opacity-60 px-1 text-xs rounded">
                                {movie.duration}
                            </div>
                        </div>
                        <div className="p-2 space-y-1">
                            <div className="flex items-center space-x-2 text-xs text-gray-300">
                                <span className="border border-gray-500 px-1 rounded">{movie.rating}</span>
                                <span className="border border-gray-500 px-1 rounded">{movie.quality}</span>
                                <span>{movie.year}</span>
                                <button className="ml-auto border border-gray-500 p-1 rounded-full">
                                    <Plus size={12} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-400">{movie.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="space-y-2">
        <h2 className="text-lg font-semibold">About HIT: The Third Case</h2>
        <p>
          <span className="text-gray-500">Director:</span>{" "}
          <span className="text-white">Sailesh Kolanu</span>
        </p>
        <p>
          <span className="text-gray-500">Cast:</span>{" "}
          Nani, Srinidhi Shetty, Rao Ramesh, Samuthirakani, Tisca Chopra, Prateik Babbar, Adivi Sesh, Srinath Maganti
        </p>
        <p>
          <span className="text-gray-500">Writer:</span>{" "}
          <span className="text-white">Sailesh Kolanu</span>
        </p>
        <p>
          <span className="text-gray-500">Genres:</span>{" "}
          Crime Movies, Thriller Movies, Telugu-Language Movies
        </p>
        <p>
          <span className="text-gray-500">This Movie Is:</span>{" "}
          <span className="text-white">Violent, Dark</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="text-gray-500">Maturity Rating:</span>
          <span className="border border-gray-500 px-1 rounded">A</span>
          <span>sexual violence references, gore, language, tobacco use, violence</span>
        </p>
      </div>
       <div className="bg-gray-900 rounded overflow-hidden">
          <div className="relative">
            <img src="/card2.jpg" alt="Mom" className=" h-40 object-cover" />
            <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-xs px-1 rounded">2h 18m</div>
          </div>
          <div className="p-2 space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <span className="border border-gray-500 px-1 rounded">U/A 16+</span>
              <span className="border border-gray-500 px-1 rounded">HD</span>
              <span>2017</span>
              <button className="ml-auto border border-gray-500 p-1 rounded-full">+</button>
            </div>
            <p className="text-xs text-gray-400">
              After her stepdaughter is sexually assaulted at a party, a furious mother...
            </p>
          </div>
        </div>
        </div>
    );
}







