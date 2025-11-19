import express from 'express';
import bcrypt from 'bcrypt';
import * as users from '../data/user.js';
import jwt from 'jsonwebtoken';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    try {
        const existingUser = users.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const saved = users.saveUser(email, hashedPassword);
        const user = users.getUserById(saved.lastInsertRowid);
        res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    try {
        const user = users.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }
        bcrypt.compare(password, user.password_hash).then((match) => {
            if (!match) {
                return res.status(404).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: user.id, email: user.email }, 'secret-key');
            res.cookie('jwt', token, { httpOnly: true, maxAge: 300000 })
                .status(200)
                .json({ message: 'Logged in successfully' });
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, maxAge: 0 })
        .status(200)
        .json({ message: 'Logged out successfully' });
});

router.get('/user', authenticateUser, (req, res) => {
    try {
        const user = users.getUserById(req.user.id);
        const { id, email } = user;
        res.status(200).json({ id, email });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
