
import React from "react";
import { useNavigate } from "react-router-dom";



const Cards = ({ video, configBaseUrl }) => {
  const navigate = useNavigate();
  return (
        <div onClick={() => navigate(`/movies/${video._id}`)}

      className="min-w-[14rem] h-36 rounded-2xl shadow-lg bg-cover bg-top flex-shrink-0 relative"
      style={{ backgroundImage: `url('${video.poster} ')` }}
    >
      <div className="absolute bottom-0 bg-black/40 backdrop-blur-sm w-full p-2 rounded-b-2xl">
        <p className="text-sm font-bold">{video.title}</p>
        <p className="text-xs text-gray-300">
          {video.genre.join(", ")} - {new Date(video.releaseDate).getFullYear()}
        </p>
      </div>
    </div>
 
  );
};

export default Cards;
