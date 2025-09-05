import Database from "better-sqlite3";
const db = new Database('./data/database.db');

// Create blog_posts table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )`).run();

export function getAllPosts() {
  return db.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all();
}

export function getPostById(id) {
  return db.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id);
}

export function createPost({ author, title, category, content }) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO blog_posts (author, title, category, content, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(author, title, category, content, now, now);
  return getPostById(info.lastInsertRowid);
}

export function updatePost(id, { author, title, category, content }) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    UPDATE blog_posts
    SET author = ?, title = ?, category = ?, content = ?, updated_at = ?
    WHERE id = ?
  `);
  stmt.run(author, title, category, content, now, id);
  return getPostById(id);
}

export function deletePost(id) {
  const stmt = db.prepare('DELETE FROM blog_posts WHERE id = ?');
  return stmt.run(id);
}

export default db;
