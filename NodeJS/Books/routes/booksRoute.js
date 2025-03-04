import express from "express";
import books from '../data/books.js';

const router = express.Router();

router.get('/books', (req, res) => {
    res.status(200).json(books)
});

router.get('/books/:id', (req, res) => {
  const id = req.params.id;

  if(id < 0 || id >= books.length){
    return res.status(404).json({message: "Book not found!"});
  }

  res.status(200).json(books[id]);
});

router.post('/books', (req, res) => { 
  const {author, title, releaseYear} = req.body;

  if(!author || !title || !releaseYear){
    return res.json({ message: "Missing data!" })
  }

  const newBook = {author, title, releaseYear}
  books.push(newBook);
  res.status(201).json(newBook);
});

router.put('/books/:id', (req, res) => {
  const id = req.params.id;

  if(id < 0 && id >= books.length){
    return res.status(404).json({message: "Book not found!"});
  }
  
  const {author, title, releaseYear} = req.body;
  
  if(!author || !title || !releaseYear){
    return res.json({ message: "Missing data!" })
  }

  books[id] = {author, title, releaseYear};
  res.status(201).json(books[id]);
});

router.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  
  if(id < 0 || id >= books.length){
    return res.status(404).json({message: "Book not found!"});
  }
  
  books.splice(id, 1);
  res.json({ message: "Delete successful" });
});

export default router;