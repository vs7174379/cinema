import express from 'express';
import cors from 'cors';
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
app.use(cors());

// Routes
app.use('/api/show', showRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => res.send('Server is Live!'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Start server
app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
