import express from 'express';
import * as Books from '../data/books.js';

const router = express.Router();

router.get('/books', (req, res) => {
    const books = Books.getBooks();
    return res.status(200).json(books);
});
router.get('/books/:id', (req, res) => {
    const id = +req.params.id;
    const book = Books.getBooksById(id);
    if (!book) {
        return res.status(400).json({ message: 'Book not found!' });
    }
    return res.status(200).json(book);
});

router.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Missing fields!' });
    }
    const id = Books.createBook(title, author, year).lastInsertRowid;
    const saved = Books.getBooksById(id);
    return res.status(201).json(saved);
});

export default router;
