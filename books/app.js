import express, { json } from 'express';
import bookRoutes from './routes/bookRoutes.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use('/api', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
