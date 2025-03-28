import express from 'express';
import router from './routes/booksRoute.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(router)