import React, { useEffect, useState } from 'react'
import { comedy, romantic,womenrule } from '../../lib/data';


import MovieList from './MovieList';
import axios from "axios"

const MovieContainer = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const top = movie.filter(m =>
        m.type === 'romantic indian movies'
    );
    const comedyMovies = movie.filter(m =>
        m.type === 'top comedy indian movies'
    );
    const marvel= movie.filter(m =>
        m.type === 'marvel movies'
    );
    const emotional = movie.filter(m =>
        m.type === 'top emotional indian movies'
    );
    const south = movie.filter(m =>
        m.type === 'top south indian movies'
    );
    const thriller = movie.filter(m =>
        m.type === 'top thriller indian movies'
    );
    const hollywood = movie.filter(m =>
        m.type === 'hollywood movies'
    );
    const hollywoodRomantic = movie.filter(m =>
        m.type === 'hollywood romantic movies'
    );

        


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://cinemo-ashy.vercel.app/api/show/movie');
                const data = response.data.movies
                if (response.data.success) {
                    setMovie(data);
                } else {
                    console.error('Failed to fetch movies:', data.message);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }
        fetchMovies();
    }, []);

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
            <MovieList title={"you might like"} movies={top} />
            <MovieList title={"Comedy Movies"} movies={comedyMovies} />
            <MovieList title={"Marvel-Hits"} movies={marvel} />
            <MovieList title={"Emotional-Movies"} movies={emotional} />
            <MovieList title={"Tollywood-BlockBusters"} movies={south} />
            <MovieList title={"Thriller-Movies"} movies={thriller} />
            <MovieList title={"Hollywood-Movies"} movies={hollywood} />
            <MovieList title={"Hollywood-Romantic-Movies"} movies={hollywoodRomantic} />
            


        </div>







    );
};
export default MovieContainer


