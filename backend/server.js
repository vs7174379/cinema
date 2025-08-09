import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import 'dotenv/config';
import connectDB from './configs/db.js';
import showRouter from './routes/showRoutes.js';
import userRouter from './routes/user.js';

const app = express();
const port = process.env.PORT || 3000;



// Trust proxy in production
if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1);

// Security & compression
app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false }));
app.use(compression());
app.use(express.json());
app.use(cookieParser());

// CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'https://cinemo-5p8g.vercel.app',
  'https://cinemo-ashy.vercel.app'
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked CORS request from: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.options('*', cors());

// Routes
app.use('/api/show', showRouter);
app.use('/api/user', userRouter);
app.get('/', (req, res) => res.send('Server is Live!'));

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Resource not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// Start after DB connect
(async () => {
  try {
    await connectDB();
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
})();
