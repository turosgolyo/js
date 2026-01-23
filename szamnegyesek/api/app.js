import express from 'express';
import * as tableRoutes from './routes/tableRoutes.js';

const PORT = 3000;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});

app.use('/', tableRoutes.default);
