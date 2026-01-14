import config from './config/config';
import memberRoutes from './routes/memberRoutes';
import roomRoutes from './routes/roomRoutes';
import memberRoomRoutes from './routes/memberRoomRoutes';
import houseRoutes from './routes/houseRoutes';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors({
// origin: 'http://localhost:5173',
// methods: ['GET', 'POST', 'PATCH', 'DELETE'],
// allowedHeaders: ['Content-Type'],
}));
app.use('/api', memberRoutes);
app.use('/api', roomRoutes);
app.use('/api', memberRoomRoutes);
app.use('/api', houseRoutes);
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
//# sourceMappingURL=index.js.map