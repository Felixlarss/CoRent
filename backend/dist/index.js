import config from './config/config.js';
import memberRoutes from './routes/memberRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import memberRoomRoutes from './routes/memberRoomRoutes.js';
import houseRoutes from './routes/houseRoutes.js';
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