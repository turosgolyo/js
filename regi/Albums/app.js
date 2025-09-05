import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/albums', (req, res) => {
  db.all('SELECT * FROM albums', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/albums/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM albums WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Album not found' });
      return;
    }
    res.json(row);
  });
});
app.post('/api/albums', (req, res) => {
  const { band, albumTitle, year, genre } = req.body;
  if (!band || !albumTitle) {
    res.status(400).json({ error: 'Band and albumTitle are required' });
    return;
  }
  const sql = 'INSERT INTO albums (band, albumTitle, year, genre) VALUES (?, ?, ?, ?)';
  db.run(sql, [band, albumTitle, year || null, genre || null], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, band, albumTitle, year, genre });
  });
});

app.put('/api/albums/:id', (req, res) => {
  const id = req.params.id;
  const { band, albumTitle, year, genre } = req.body;
  if (!band || !albumTitle) {
    res.status(400).json({ error: 'Band and albumTitle are required' });
    return;
  }
  const sql = 'UPDATE albums SET band = ?, albumTitle = ?, year = ?, genre = ? WHERE id = ?';
  db.run(sql, [band, albumTitle, year || null, genre || null, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Album not found' });
      return;
    }
    res.json({ id, band, albumTitle, year, genre });
  });
});

app.delete('/api/albums/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM albums WHERE id = ?', [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ error: 'Album not found' });
      return;
    }
    res.json({ message: 'Album deleted' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
