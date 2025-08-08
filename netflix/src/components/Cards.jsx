
import React from "react";



const Cards = ({ video, configBaseUrl }) => {
  return (
   <a href="/home">
     <div

      className="min-w-[14rem] h-36 rounded-2xl shadow-lg bg-cover bg-top flex-shrink-0 relative"
      style={{ backgroundImage: `url('${video.poster} ')` }}
    >
      <div className="absolute bottom-0 bg-black/40 backdrop-blur-sm w-full p-2 rounded-b-2xl">
        <p className="text-sm font-bold">{video.title}</p>
        <p className="text-xs text-gray-300">
          {video.genre.join(", ")} - {video.year}
        </p>
      </div>
    </div>
   </a>
  );
};

export default Cards;
