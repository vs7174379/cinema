import React, { useEffect, useState } from 'react'
import {comedy, romantic, top, womenrule} from '../../lib/data';


import MovieList from './MovieList';
import axios from "axios"

const MovieContainer = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const response = await axios.get('https://cinemo-ashy.vercel.app/api/show/toprated-movies');
                if (response.data.success) {
                    setMovies(response.data.movies);
                }
            } catch (error) {
                console.error('Error fetching now playing movies:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNowPlaying();
    }, []);

    if (loading) return <p className="text-center text-white">Loading...</p>;

    return (
         <div>
             <MovieList title={"you might like"} movies={top}/>
             <MovieList title={"Comedy Movies"} movies={comedy}/>
             <MovieList title={"Romantic Movies"} movies={romantic}/>
             <MovieList title={"Women Ruling Movies"} movies={womenrule}/>


         </div>

       
        

       
        
    
    );
};
export default MovieContainer


