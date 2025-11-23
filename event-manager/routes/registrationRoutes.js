import express from 'express';
import * as registrationData from '../data/registration.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/registrations', (req, res) => {
    try {
        const registrationsList = registrationData.getRegistrations();
        res.status(200).json(registrationsList);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/registrations/user/:id', authenticateUser, (req, res) => {
    try {
        const id = req.params.id;
        const userRegistrationsList = registrationData.getRegistrationsByUserId(id);
        res.status(200).json(userRegistrationsList);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/registrations', authenticateUser, (req, res) => {
    const { eventId, userId } = req.body;
    if (!eventId) {
        return res.status(400).json({ message: 'Missing fields!' });
    }
    try {
        registrationData.saveRegistration(userId, eventId);
        const registrationsList = registrationData.getRegistrationsByUserId(userId);
        res.status(201).json(registrationsList);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
