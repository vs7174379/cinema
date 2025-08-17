import express from 'express';
import {
  login,
  register,
  logOut,
  updateUser,
  getProfile,
 
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


export default router;