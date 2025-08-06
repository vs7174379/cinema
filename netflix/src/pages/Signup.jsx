import React from 'react';
import { Edit, LogOut } from 'lucide-react';

const continueWatching  = [
  {
    title: 'Stranger Things',
    image: 'https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg',
    progress: 40, // percent
  },
  {
    title: 'Sacred Games',
    image: 'https://image.tmdb.org/t/p/w500/7HtvmsLtyC1iH6jlm9qvZ6e3uXl.jpg',
    progress: 70,
  },
  {
    title: 'Extraction',
    image: 'https://image.tmdb.org/t/p/w500/nygOUcBKPHFTbxsYRFZVePqgPK6.jpg',
    progress: 20,
  },
];

const Signup = () => {
  return (
    <div className="  text-white px-6 py-10">
      <div className=" glass max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-8 relative border border-white/10  shadow-xl">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-gradient-to-tr from-black via-gray-900 to-gray-800">
          {/* Avatar */}
          <img
            src="https://i.pravatar.cc/150?img=32"
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
            alt="User"
          />

          {/* Info */}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">Vivek Sharma</h2>
                <p className="text-md font-bold text-yellow-400 mt-1">Premium Member</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm">
                  <Edit size={16} /> Edit Profile
                </button>
                <button className="flex items-center gap-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>

            <p className="mt-3 text-gray-300 text-sm">
              Your subscription is valid until <span className="text-white">Jan 15, 2026</span>.
            </p>
          </div>
        </div>

        {/* Continue Watching Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Continue Watching</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {continueWatching.map((item, i) => (
              <div key={i} className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-white/10">
                <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="text-md font-semibold mb-2">{item.title}</h4>
                  <div className="w-full h-2 bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{item.progress}% watched</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
