import express from 'express';
import {
  login,
  register,
  logOut,
  updateUser,
  getProfile,
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
 
} from '../controllers/user.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Logout user
router.post('/logout', logOut);

// Get user profile
router.get('/profile', authMiddleware, getProfile);

// Update user profile
router.put('/:id', authMiddleware, updateUser);


router.post("/add", addToWatchlist);          // Add movie
router.get("/:userId", getWatchlist);         // Get user's watchlist
router.post("/remove", removeFromWatchlist);
export default router;