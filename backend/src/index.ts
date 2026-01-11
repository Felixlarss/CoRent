import config from './config/config.ts';
import memberRoutes from './routes/memberRoutes.ts';
import roomRoutes from './routes/roomRoutes.ts';
import memberRoomRoutes from './routes/memberRoomRoutes.ts';
import houseRoutes from './routes/houseRoutes.ts';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();

app.use(
  cors({
    // origin: 'http://localhost:5173',
    // methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    // allowedHeaders: ['Content-Type'],
  }),
);

app.use(express.json());

app.use('/api', memberRoutes);
app.use('/api', roomRoutes);
app.use('/api', memberRoomRoutes);
app.use('/api', houseRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
