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

app.get('/users', (req, res) => {
    const users = db.getUsers();
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const user = db.getUserById(+req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'Invalid credentials' });
    }
    res.json(user);
});

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const saved = db.saveUser(email, hashedPassword);
    const user = db.getUserById(saved.lastInsertRowid);
    res.status(201).json(user);
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const user = db.getUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: 'Invalid credentials' });
    }
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }
        res.json(user);
    });
});
