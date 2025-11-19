import express from 'express';
import * as eventData from '../data/event.js';

const router = express.Router();

router.get('/events', (req, res) => {
    try {
        const eventsList = eventData.getEvents();
        res.status(200).json(eventsList);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/events/:id', (req, res) => {
    const id = +req.params.id;
    try {
        const event = eventData.getEventById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found!' });
        }
        return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/events', (req, res) => {
    const { name, date, location, description } = req.body;
    if (!name || !date || !location || !description) {
        return res.status(400).json({ message: 'Missing fields!' });
    }
    try {
        const saved = eventData.saveEvent(name, date, location, description);
        const event = eventData.getEventById(saved.lastInsertRowid);
        res.status(201).json(event);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
