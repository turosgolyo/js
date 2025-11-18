import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import * as db from './util/database.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});


