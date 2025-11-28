import express, { json } from 'express';
import * as Books from './data/books.js';

const PORT = 3000;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

app.get('/books', (req, res) => {
    const books = Books.getBooks();
    return res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
    const id = +req.params.id;
    const book = Books.getBooksById(id);
    if (!book) {
        return res.status(400).json({ message: 'Book not found!' });
    }
    return res.status(200).json(book);
});

app.post('/books', (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: 'Missing fields!' });
    }
    const id = Books.createBook(title, author, year).lastInsertRowid;
    const saved = Books.getBooksById(id);
    return res.status(201).json(saved);
});
