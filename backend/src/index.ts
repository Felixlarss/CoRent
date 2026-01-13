import config from './config/config.ts';
import memberRoutes from './routes/memberRoutes.ts';
import roomRoutes from './routes/roomRoutes.ts';
import memberRoomRoutes from './routes/memberRoomRoutes.ts';
import houseRoutes from './routes/houseRoutes.ts';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(
  cors({
    // origin: 'http://localhost:5173',
    // methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    // allowedHeaders: ['Content-Type'],
  }),
);

app.use('/api', memberRoutes);
app.use('/api', roomRoutes);
app.use('/api', memberRoomRoutes);
app.use('/api', houseRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.use(express.json());

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
