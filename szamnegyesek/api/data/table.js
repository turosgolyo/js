import db from './db.js';

db.prepare(
    `CREATE TABLE IF NOT EXISTS tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numbers TEXT UNIQUE NOT NULL
    )`,
).run();

export const getAllTables = () => db.prepare('SELECT * FROM tables').all();

export const getTableById = (id) => db.prepare('SELECT * FROM tables WHERE id = ?').get(id);

export const createTable = (numbers) =>
    db.prepare('INSERT INTO tables (numbers) VALUES (?)').run(numbers);

export const updateTable = (id, numbers) =>
    db.prepare('UPDATE tables SET numbers = ? WHERE id = ?').run(numbers, id);

export const deleteTable = (id) => db.prepare('DELETE FROM tables WHERE id = ?').run(id);
