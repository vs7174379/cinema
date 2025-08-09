import express from 'express';
import {
  login,
  register,
  logOut,
  updateUser,
  profile,

} from '../controllers/user.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Logout user
router.post('/logout', logOut);


// Update user profile
router.put('/:id', updateUser);

router.get("/profile", authMiddleware,profile);




export default router;