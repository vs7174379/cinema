import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const movies = [
  {
    title: "Stranger Things",
    image: "https://i.imgur.com/ZL0p3Wl.jpg",
    description: "Supernatural forces and secret experiments surround a group of kids.",
  },
  {
    title: "The Witcher",
    image: "https://i.imgur.com/E8Y5h8c.jpg",
    description: "Geralt, a monster hunter, navigates a morally gray world of beasts and men.",
  },
  {
    title: "Breaking Bad",
    image: "https://i.imgur.com/UePbdph.jpg",
    description: "A chemistry teacher turns to crime after a terminal diagnosis.",
  },
  {
    title: "Stranger Things",
    image: "https://i.imgur.com/ZL0p3Wl.jpg",
    description: "Supernatural forces and secret experiments surround a group of kids.",
  },
  {
    title: "The Witcher",
    image: "https://i.imgur.com/E8Y5h8c.jpg",
    description: "Geralt, a monster hunter, navigates a morally gray world of beasts and men.",
  },
  {
    title: "Breaking Bad",
    image: "https://i.imgur.com/UePbdph.jpg",
    description: "A chemistry teacher turns to crime after a terminal diagnosis.",
  },
];

const MovieSlider = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-6">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation={true}
        keyboard={{ enabled: true }}
        modules={[Navigation, Pagination, Keyboard]}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-7xl"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="relative w-64 rounded-xl overflow-hidden transition-transform duration-300 transform hover:scale-110 shadow-lg cursor-pointer group">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-96 object-cover opacity-90 group-hover:opacity-50 transition-opacity duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
                <p className="text-gray-300 text-sm mt-1 line-clamp-3">{movie.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
