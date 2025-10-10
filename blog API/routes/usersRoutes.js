import express from 'express';
import bcrypt from 'bcrypt';
import {
    getUsers,
    getUserByEmail,
    getUserById,
    saveUser,
    updateUser,
    deleteUser,
} from '../util/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    const users = getUsers();
    res.status(200).json(users);
});

router.get('/:id', (req, res) => {
    const user = getUserById(+req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
});

router.get('/:email', (req, res) => {
    const user = getUserByEmail(req.params.email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const user = getUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: 'Invalid credentials' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(403).json({ message: 'Invalid credentials' });
    }
    res.status(200).json(user);
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const existingUser = getUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const savedUser = saveUser(name, email, hashedPassword);
    const user = getUserById(savedUser.lastInsertRowid);
    res.status(201).json(user);
});

router.put('/:id', (req, res) => {
    const id = +req.params.id;
    const user = getUserById(id);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Missing requiered fields' });
    }
    const existingUser = getUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
    }
    const updatedUser = updateUser(id, name, email, password);
    res.status(200).json(updatedUser);
});

router.delete('/:id', (req, res) => {
    const id = +req.params.id;
    const user = getUserById(id);
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    deleteUser(id);
    res.status(204).json({ message: 'User deleted' });
});
export default router;
