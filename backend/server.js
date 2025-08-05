import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import showRouter from './routes/showRoutes.js';





const app = express();
const port = 5000;


// Middleware



app.use(express.json())
app.use(cors())
await connectDB()

app.use('/api/show', showRouter)



app.get('/', (req, res) => res.send('Server is Live!'))

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

