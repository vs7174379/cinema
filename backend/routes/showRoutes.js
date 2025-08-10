import express from "express";
import { getmovie, getMovieById, getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcommingMovies } from "../controllers/showController.js";

const showRouter = express.Router();
showRouter.get('/now-playing', getNowPlayingMovies)


showRouter.get('/popular-movies', getPopularMovies)
showRouter.get('/upcomming-movies', getUpcommingMovies)
showRouter.get('/toprated-movies', getTopRatedMovies)
showRouter.get('/movie/:id', getMovieById);
showRouter.get('/movie', getmovie)
export default showRouter