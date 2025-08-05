export const api_end_point="http://localhost:8080/api/user";


export const options = { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } }

export const Popular_Movie = "https://api.themoviedb.org/3/movie/popular";
export const Top_Rated_Movie = "https://api.themoviedb.org/3/movie/top_rated";
export const Upcoming_Movie = "https://api.themoviedb.org/3/movie/upcoming";

export const  SEARCH_MOVIE_URL="https://api.themoviedb.org/3/search/movie?query=";

export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w500";
