import db from './db.js';

db.prepare(
    `CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    date TEXT,
    location TEXT, 
    description TEXT
    )`,
).run();

export const getEvents = () => db.prepare('SELECT * FROM events').all();

export const getEventById = (id) => db.prepare('SELECT * FROM events WHERE id = ?').get(id);

export const saveEvent = (name, date, location, description) =>
    db
        .prepare('INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)')
        .run(name, date, location, description);

export const updateEvent = (id, name, date, location, description) =>
    db
        .prepare('UPDATE events SET name = ?, date = ?, location = ?, description = ? WHERE id = ?')
        .run(name, date, location, description, id);

export const deleteEvent = (id) => db.prepare('DELETE FROM events WHERE id = ?').run(id);
