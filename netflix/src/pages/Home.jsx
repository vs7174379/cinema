import React from 'react';

const Home = () => {
  return (
    <div>
      <main className="flex flex-col overflow-y-auto h-full" id="style-7">
        

        {/* Hero Section */}
        <section className="relative flex flex-col lg:items-center ">
          <div
            className="relative min-h-[40vh] sm:min-h-[60vh] lg:min-h-[70vh] bg-cover bg-center rounded-2xl m-4 sm:m-10 overflow-hidden lg:w-[60rem]"
            style={{
              backgroundImage:
                "url('https://www.comingsoon.net/wp-content/uploads/sites/3/2024/01/Coming-Soon-Cover-Images-2-12.png?w=1024')",
            }}
          >
             <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-transparent'></div>

          </div>

          {/* Movie Info */}
          <div className="flex flex-col items-center relative z-10 px-6 sm:px-10 -mt-48 sm:-mt-72 mx-auto lg:w-[60rem]    inset-0 bg-gradient-to-t from-black via-black to-black/20">
            <h1 className="text-4xl sm:text-5xl sm:font-bold mb-4">Bawaal</h1>
            <p className="text-gray-200 sm:text-xl md:w-1/2 sm:font-bold leading-relaxed mb-4">
              Ajay Dixit, an ordinary history teacher in a high school, enjoys mini celebrityhood in his town courtesy the
              fake image he has built. He shares a strained relationship with his newly-wed wife...
            </p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-2">
              <span>IMDb 6.6</span> •
              <span>2 h 17 min</span> •
              <span>2023</span>
              <span className="px-2 py-1 bg-gray-600 rounded">X-RAY</span>
              <span className="px-2 py-1 bg-gray-600 rounded">HDR</span>
              <span className="px-2 py-1 bg-gray-600 rounded">UHD</span>
              <span className="px-2 py-1 bg-gray-600 rounded">U/A 13+</span>
            </div>
            <div className="text-sm text-blue-400 font-semibold mb-6 flex flex-wrap gap-3">
              <a href="#" className="hover:underline">Romance</a>
              <a href="#" className="hover:underline">Drama</a>
              <a href="#" className="hover:underline">Heartwarming</a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <button className="bg-white text-black font-semibold px-6 py-3 rounded flex items-center gap-2 text-lg">
                <i className="fas fa-play" /> Watch now
              </button>
              
            </div>
            
            <div className="flex gap-4 mb-4 text-xl">
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full">
                <i className="fas fa-film" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full">
                <i className="fas fa-plus" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full">
                <i className="fas fa-thumbs-up" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full">
                <i className="fas fa-share" />
              </button>
            </div>
            
          </div>
        </section>

        {/* Tabs */}
        <div className="flex gap-6 px-6 sm:px-10 pt-6 text-lg border-b border-gray-600">
          <button className="border-b-2 border-white pb-2 font-semibold">Related</button>
          <button className="text-gray-400 hover:text-white pb-2">Details</button>
        </div>

        {/* Related Movies */}
        <section className="px-6 sm:px-10 py-6">
          <h2 className="text-xl font-semibold mb-4">Customers also watched</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {[...Array(10)].map((_, idx) => (
              <div key={idx} className="w-36 sm:w-48 flex-shrink-0 relative">
                <img
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS_WhubxLwynDD0XPpLbF9Ol-QYjPrfiia4e2Gd2QHmLztf--FZpK9WAemCIcUXgL9Brv1W"
                  alt="Related Movie"
                  className="rounded w-full"
                />
                <span className="absolute bottom-2 right-2 bg-white/80 text-black px-2 text-xs rounded">
                  MX PLAYER
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
