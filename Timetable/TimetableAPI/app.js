import express from 'express';
import router from './routes/timetableRouter.js';
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/timetable', router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
  
