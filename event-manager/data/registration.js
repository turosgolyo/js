import db from './db.js';

db.prepare(
    `CREATE TABLE IF NOT EXISTS registrations (
    event_id INTEGER, 
    user_id INTEGER,
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    )`,
).run();

export const getRegistrations = () => db.prepare('SELECT * FROM registrations').all();

export const saveRegistraion = (user_id, event_id) =>
    db
        .prepare('INSERT INTO registrations (user_id = ?, event_id = ?) VALUES (?, ?)')
        .run(user_id, event_id);

export const deleteRegistration = (user_id, event_id) =>
    db
        .prepare('DELETE FROM registrations WHERE user_id = ? AND event_id = ?')
        .run(user_id, event_id);
