import db from './db.js';

db.prepare(
    `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    password_hash TEXT)`,
).run();

export const getUsers = () => db.prepare('SELECT * FROM users').all();

export const getUserById = (id) => db.prepare('SELECT * FROM users WHERE id = ?').get(id);

export const getUserByEmail = (email) =>
    db.prepare('SELECT * FROM users WHERE email = ?').get(email);

export const saveUser = (email, password_hash) =>
    db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, password_hash);

export const updateUser = (id, email, password_hash) =>
    db
        .prepare('UPDATE users SET email = ?, password_hash = ? WHERE id = ?')
        .run(email, password_hash, id);

export const deleteUser = (id) => db.prepare('DELETE FROM users WHERE id = ?').run(id);
