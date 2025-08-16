import axios from "axios"
import { options, Popular_Movie, Upcoming_Movie } from "../utils/constant.js";
import { Movie } from "../models/movie.js";


export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } })
    const movies = data.results;
    res.json({ success: true, movies: movies })
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message })
  }
}




const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}/videos`, { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } });

    const videos = response.data.results;


    // Find the first YouTube trailer
    const trailer = videos.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );


    if (!trailer) {
      return res.status(404).json({ message: 'Trailer not found' });
    }

    // Return trailer info or just the YouTube URL
    return res.json({
      id: trailer.id,
      name: trailer.name,
      url: `https://www.youtube.com/watch?v=${trailer.key}`
    });
  } catch (error) {
    console.error('Error fetching trailer:', error.message);
    return res.status(500).json({ message: 'Failed to fetch trailer' });
  }
};

export const getPopularMovies = async (req, res) => {

  try {
    const { data } = await axios.get(Popular_Movie, options)
    const movies = data.results;
    res.json({ success: true, movies: movies })



  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
export const getUpcommingMovies = async (req, res) => {

  try {
    const { data } = await axios.get(Upcoming_Movie, options)
    const movies = data.results;
    res.json({ success: true, movies: movies })



  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}
export const getTopRatedMovies = async (req, res) => {

  try {
    const { data } = await axios.get('https://api.themoviedb.org/3/movie/top_rated', { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } })
    const movies = data.results;
    res.json({ success: true, movies: movies })



  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const getmovie = async (req, res) => {

  try {
    const movies = await Movie.find({});
    res.json({ success: true, movies: movies })



  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const getMoviById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, movie: movie });
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch movie' });
  }
}



export const addMovie = async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      genre,
      releaseDate,
      duration,
      language,
      poster,
      backdrop,
      trailerUrl,
      cast,
      rating

    } = req.body;

    // Create new movie
    const newMovie = new Movie({
      title,
      type,
      description,
      genre,
      releaseDate,
      duration,
      language,
      poster,
      backdrop,
      trailerUrl,
      cast,
      rating
     
    });

    // Save movie
    const savedMovie = await newMovie.save();

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      movie: savedMovie,
    });
  } catch (error) {
    console.error("Error adding movie:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
}


export const edit = async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      genre,
      releaseDate,
      duration,
      language,
      poster,
      backdrop,
      trailerUrl,
      cast,
      rating

    } = req.body;

    // Create new movie
    const updateMovie = new Movie({
      title,
      type,
      description,
      genre,
      releaseDate,
      duration,
      language,
      poster,
      backdrop,
      trailerUrl,
      cast,
      rating
     
    });

    // Save movie
    const savedMovie = await updateMovie.updateOne(title);

    res.status(201).json({
      success: true,
      message: "Movie updated successfully",
      movie: savedMovie,
    });
  } catch (error) {
    console.error("Error adding movie:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
}