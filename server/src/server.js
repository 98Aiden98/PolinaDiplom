import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';

import { connectDB } from './config/db.js';
import { uploadsDir } from './config/paths.js';
import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import resultsRoutes from './routes/resultsRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/team', teamRoutes);

app.use(errorHandler);

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err.message);
    process.exit(1);
  });
