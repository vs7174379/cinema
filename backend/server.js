import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();
import connectDB from './configs/db.js';
import showRouter from './routes/showRoutes.js';
import userRouter from './routes/user.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to DB
(async () => {
    try {
        await connectDB();
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
})();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'https://cinemo-5p8g.vercel.app',
    'https://cinemo-ashy.vercel.app'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

// Routes
app.use('/api/show', showRouter);
app.use('/api/user', userRouter); // Apply authMiddleware to /api/user routes

// Root route
app.get('/', (req, res) => res.send('Server is Live!'));

app.get("/api/profile", authMiddleware, (req, res,next) => {
  res.json({ user: req.user });
  next()
});

// 404 handler
app.use((req, res, next) => { // Added next
    res.status(404).json({ message: 'Resource not found', success: false }); // Added success: false
    next()
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    next()
});

// Start server
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
