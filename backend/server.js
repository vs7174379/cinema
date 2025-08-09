import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import helmet from 'helmet';
import compression from 'compression';
import 'dotenv/config';
import connectDB from './configs/db.js';
import showRouter from './routes/showRoutes.js';
import userRouter from './routes/user.js';

const app = express();
const port = process.env.PORT || 3000;

// Ensure secrets are defined
if (!process.env.JWT_SECRET || !process.env.SESSION_SECRET) {
  throw new Error("JWT_SECRET and SESSION_SECRET must be set in .env");
}

// Trust proxy in production (for cookies to work behind Vercel/Heroku)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

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
app.use(helmet()); // Adds security headers
app.use(compression()); // Compress responses
app.use(express.json());
app.use(cookieParser());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'lax'
  }
}));

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://cinemo-5p8g.vercel.app',
  'https://cinemo-ashy.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Routes
app.use('/api/show', showRouter);
app.use('/api/user', userRouter);

// Root route
app.get('/', (req, res) => res.send('Server is Live!'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start server
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
