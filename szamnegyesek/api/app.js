import express from 'express';
import cors from 'cors';
import * as tableRoutes from './routes/tableRoutes.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});

app.use('/', tableRoutes.default);
