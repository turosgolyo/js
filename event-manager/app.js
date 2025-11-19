import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import cookieParser from 'cookie-parser';

const PORT = 3000;
const app = express();

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.static('public'));

app.use('/api', eventRoutes);
app.use('/api', userRoutes);
app.use('/api', registrationRoutes);

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});
