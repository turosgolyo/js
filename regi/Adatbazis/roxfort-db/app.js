const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./wizards.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the wizards database.');
});

db.run(`CREATE TABLE IF NOT EXISTS wizards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  magic_wand TEXT,
  house TEXT
)`);


app.get('/wizard', (req, res) => {
  db.all('SELECT * FROM wizards', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


app.get('/wizard/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM wizards WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Wizard not found' });
    }
    res.json(row);
  });
});


app.post('/wizard', (req, res) => {
  const { name, magicWand, house } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  const sql = 'INSERT INTO wizards (name, magic_wand, house) VALUES (?, ?, ?)';
  db.run(sql, [name, magicWand || null, house || null], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});


app.put('/wizard/:id', (req, res) => {
  const { id } = req.params;
  const { name, magicWand, house } = req.body;

  const updates = [];
  const params = [];

  if (name !== undefined) {
    updates.push('name = ?');
    params.push(name);
  }
  if (magicWand !== undefined) {
    updates.push('magic_wand = ?');
    params.push(magicWand);
  }
  if (house !== undefined) {
    updates.push('house = ?');
    params.push(house);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  params.push(id);
  const sql = `UPDATE wizards SET ${updates.join(', ')} WHERE id = ?`;

  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Wizard not found' });
    }
    res.json({ message: 'Wizard updated successfully' });
  });
});


app.delete('/wizard/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM wizards WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Wizard not found' });
    }
    res.json({ message: 'Wizard deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});