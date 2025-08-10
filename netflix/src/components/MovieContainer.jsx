import React, { useEffect, useState } from 'react'
import { comedy, romantic,womenrule } from '../../lib/data';


import MovieList from './MovieList';
import axios from "axios"

const MovieContainer = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const top = movie.filter(m =>
        m.type === 'top indian movies'
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
            <MovieList title={"Comedy Movies"} movies={comedy} />
            <MovieList title={"Romantic Movies"} movies={romantic} />
            <MovieList title={"Women Ruling Movies"} movies={womenrule} />
            <MovieList title={"Movies"} movies={movie} />


        </div>







    );
};
export default MovieContainer


