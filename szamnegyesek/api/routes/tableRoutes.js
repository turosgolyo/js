import * as tables from '../data/table.js';
import express from 'express';

const router = express.Router();

router.get('/tables', (req, res) => {
    const allTables = tables.getAllTables();
    res.json(allTables);
});

router.get('/tables/:id', (req, res) => {
    const table = tables.getTableById(req.params.id);
    if (!table) {
        return res.status(404).json({ error: 'Table not found' });
    }
    res.json(table);
});

router.post('/tables', (req, res) => {
    const { numbers } = req.body;
    if (!numbers) {
        return res.status(400).json({ message: 'Invalid data ' });
    }
    if (JSON.parse(numbers).length !== 4) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    const newTable = tables.createTable(numbers);
    if (!newTable) {
        return res.status(400).json({ message: 'Something went wrong' });
    }
    res.status(201).json(newTable);
});

router.put('/tables/:id', (req, res) => {
    const { numbers } = req.body;
    if (JSON.parse(numbers).length !== 4) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    const updatedTable = tables.updateTable(req.params.id, numbers);
    if (!updatedTable) {
        return res.status(404).json({ message: 'Table not found' });
    }
    res.json(updatedTable);
});

router.delete('/tables/:id', (req, res) => {
    const deletedTable = tables.deleteTable(req.params.id);
    if (!deletedTable) {
        return res.status(404).json({ message: 'Table not found' });
    }
    res.status(204).json({ message: 'Table deleted' });
});

export default router;
