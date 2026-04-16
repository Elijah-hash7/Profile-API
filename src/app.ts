import express, { Application, Request, Response } from 'express';
import profileRoutes from './routes/profileRoutes';
import { connectDB } from './config/db';
import cors from 'cors';

const app: Application = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/profiles', profileRoutes)


app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default app;
