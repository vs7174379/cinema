import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const WatchPage = () => {
   const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://cinema-flame-seven.vercel.app/api/show/movi/${id}`);
        setMovie(response.data.movie);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  return (
    <div>
       <iframe
        width="100%"
        height="100%"
        src={`${movie.trailerUrl}?autoplay=1&controls=1`} // Use movie.videoUrl
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default WatchPage