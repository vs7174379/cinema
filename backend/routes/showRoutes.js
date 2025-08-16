import express from "express";
import { addMovie, edit, getMoviById, getmovie, getMovieById, getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcommingMovies } from "../controllers/showController.js";

const showRouter = express.Router();
showRouter.get('/now-playing', getNowPlayingMovies)


showRouter.get('/popular-movies', getPopularMovies)
showRouter.get('/upcomming-movies', getUpcommingMovies)
showRouter.get('/toprated-movies', getTopRatedMovies)
showRouter.get('/movie/:id', getMovieById);
showRouter.get('/movi/:id', getMoviById);
showRouter.get('/movie', getmovie)
showRouter.post('/addMovie',addMovie)
showRouter.put("/:id", edit);

export default showRouter