// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store books (Hint #4)
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" }
];

let nextId = 4; // For auto-incrementing IDs

// ========== REST API ENDPOINTS ==========

// GET /books - Return all books (Hint #5)
app.get('/books', (req, res) => {
    res.status(200).json({
        success: true,
        count: books.length,
        data: books
    });
});

// GET /books/:id - Get a single book by ID
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    
    if (!book) {
        return res.status(404).json({
            success: false,
            message: `Book with ID ${id} not found`
        });
    }
    
    res.status(200).json({
        success: true,
        data: book
    });
});

// POST /books - Add a new book (Hint #6)
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    
    // Validation
    if (!title || !author) {
        return res.status(400).json({
            success: false,
            message: 'Please provide both title and author'
        });
    }
    
    const newBook = {
        id: nextId++,
        title: title.trim(),
        author: author.trim()
    };
    
    books.push(newBook);
    
    res.status(201).json({
        success: true,
        message: 'Book added successfully',
        data: newBook
    });
});

// PUT /books/:id - Update a book by ID (Hint #7)
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Book with ID ${id} not found`
        });
    }
    
    // Update only provided fields
    if (title) books[bookIndex].title = title.trim();
    if (author) books[bookIndex].author = author.trim();
    
    res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data: books[bookIndex]
    });
});

// DELETE /books/:id - Remove a book by ID (Hint #8)
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `Book with ID ${id} not found`
        });
    }
    
    const deletedBook = books.splice(bookIndex, 1);
    
    res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data: deletedBook[0]
    });
});

// Start server (Hint #3)
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
    console.log(`📚 Book API endpoints:`);
    console.log(`   GET    - http://localhost:${PORT}/books`);
    console.log(`   POST   - http://localhost:${PORT}/books`);
    console.log(`   PUT    - http://localhost:${PORT}/books/:id`);
    console.log(`   DELETE - http://localhost:${PORT}/books/:id`);
});