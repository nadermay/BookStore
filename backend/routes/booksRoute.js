import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to save a new book
router.post('/', async (request, response) => {
  try {
    // Validate required fields
    const { title, author, publishYear } = request.body;
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    // Create and save the book
    const savedBook = await Book.create({ title, author, publishYear });
    return response.status(201).send(savedBook);
  } catch (error) {
    console.error('Error saving the book:', error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to get all books
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to get a book by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }
    return response.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to update a book
router.put('/:id', async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true, runValidators: true }
    );
    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }
    return response.status(200).send({ message: 'Book updated successfully', book: result });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route to delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }
    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default router;
