import express from 'express';
import {
  login,
  register,
  logOut,
  getProfile,
  updateProfile,
  deleteAccount,
  deleteUser // Import the new controller
} from '../controllers/user.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Logout user
router.post('/logout', logOut);

// Get current user profile (for navbar/profile)
router.get('/profile', getProfile);

// Update user profile
router.put('/profile', updateProfile);

// Delete user account
router.delete('/delete', deleteAccount);

// Delete user by ID
router.delete('/:id', deleteUser); // Add the new route

export default router;