import express from 'express';
import router from './routes/wizardsRouter.js';

const app = express();
app.use(express.json());

const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(router)