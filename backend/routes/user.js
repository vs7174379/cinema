import express from 'express';
import { login, register, logOut } from '../controllers/user.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Logout user
router.post('/logout', logOut);

export default router;