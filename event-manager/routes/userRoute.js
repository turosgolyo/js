import express from 'express';

const router = express.Router();

router.get('/users', (req, res) => {
    const users = db.getUsers();
    res.json(users);
});

router.get('/users/:id', (req, res) => {
    const user = db.getUserById(+req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'Invalid credentials' });
    }
    res.json(user);
});

router.post('/register', async (req, res) => {
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

router.post('/login', (req, res) => {
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

export default router;
