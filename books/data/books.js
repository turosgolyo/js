import db from './db.js';

db.prepare(
    `CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    year INTEGER
    )`,
).run();

export const getBooks = () => db.prepare('SELECT * FROM books').all();

export const getBooksById = (id) => db.prepare('SELECT * FROM books WHERE id = ?').get(id);

export const createBook = (title, author, year) =>
    db.prepare('INSERT INTO books (title, author, year) VALUES (?, ?, ?)').run(title, author, year);
