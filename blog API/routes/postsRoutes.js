import { Router } from 'express';
import { getPosts, getPostById, getPostByUserId, savePost, deletePost } from '../data/post.js';

const router = Router();

router.get('/', (req, res) => {
    const posts = getPosts();
    res.status(200).json(posts);
});

router.get('/:id', (req, res) => {
    const post = getPostById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
});

router.get('/user/:userId', (req, res) => {
    const posts = getPostByUserId(req.params.userId);
    res.status(200).json(posts);
});

router.post('/', (req, res) => {
    const { userId, title, content } = req.body;
    if (!userId || !title || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const savedPost = savePost(userId, title, content);
    const post = getPostById(savedPost.lastInsertRowid);
    res.status(201).json(post);
});

router.put('/:id', (req, res) => {
    const id = +req.params.id;
    const post = getPostById(id);
    if (!post) {
        return res.status(400).json({ message: 'Post not found' });
    }
    const { userId, title, content } = req.body;
    if (!userId || !title || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    post.updatePost(id, userId, title, content);
    const updatedPost = getPostById(id);
    res.status(200).json(updatedPost);
});

router.delete('/posts/:id', (req, res) => {
    const id = +req.params.id;
    const post = getPostById(id);
    if (!post) {
        return res.status(400).json({ message: 'Post not found' });
    }
    deletePost(id);
    res.status(204).json({ message: 'Post deleted' });
});

export default router;
