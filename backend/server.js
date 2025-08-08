import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import 'dotenv/config';
import connectDB from './configs/db.js';
import showRouter from './routes/showRoutes.js';
import userRouter from './routes/user.js';

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

// Middleware
app.use(express.json());
app.use(cookieParser());

// Session middleware (before CORS)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // set to true if using https
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'lax' // or 'strict' depending on your needs
  }
}));

const allowedOrigins = [
  'http://localhost:5173',
  'https://cinemo-5p8g.vercel.app',
  'https://cinemo-ashy.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) { // allow requests with no origin (like mobile apps)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Important: allow cookies to be sent
}));

// Routes
app.use('/api/show', showRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => res.send('Server is Live!'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handling middleware (after routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
