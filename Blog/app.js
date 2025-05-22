import express from 'express';
import * as db from './util/database.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/posts', (req, res) => {
  const posts = db.getAllPosts();
  res.json(posts);
});

app.get('/posts/:id', (req, res) => {
  const post = db.getPostById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

app.post('/posts', (req, res) => {
  const { author, title, category, content } = req.body;
  if (!author || !title || !category || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newPost = db.createPost({ author, title, category, content });
  res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) => {
  const { author, title, category, content } = req.body;
  const post = db.getPostById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  if (!author || !title || !category || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const updatedPost = db.updatePost(req.params.id, { author, title, category, content });
  res.json(updatedPost);
});

app.delete('/posts/:id', (req, res) => {
  const post = db.getPostById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  db.deletePost(req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Blog API server listening at http://localhost:${port}`);
});
