const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found." });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, summary, cover, pdfUrl } = req.body;
    const coverFile = req.files?.coverFile?.[0];
    const pdfFile = req.files?.pdfFile?.[0];

    if (!title || !author) {
      return res.status(400).json({ message: "Book title and author are required." });
    }

    const coverPath = coverFile ? `/uploads/${coverFile.filename}` : cover;
    const pdfPath = pdfFile ? `/uploads/${pdfFile.filename}` : pdfUrl;

    const book = new Book({
      title,
      author,
      summary,
      cover: coverPath,
      pdfUrl: pdfPath,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, summary, genre, cover, pdfUrl } = req.body;
    const coverFile = req.files?.coverFile?.[0];
    const pdfFile = req.files?.pdfFile?.[0];

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found." });

    if (title) book.title = title;
    if (author) book.author = author;
    if (summary) book.summary = summary;
    if (genre) book.genre = genre;

    if (coverFile) {
      book.cover = `/uploads/${coverFile.filename}`;
    } else if (cover) {
      book.cover = cover;
    }

    if (pdfFile) {
      book.pdfUrl = `/uploads/${pdfFile.filename}`;
    } else if (pdfUrl) {
      book.pdfUrl = pdfUrl;
    }

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found." });

    const userId = req.userId;
    const alreadyBorrowed = book.borrowers.some((borrower) => borrower.toString() === userId);
    if (alreadyBorrowed) {
      return res.status(400).json({ message: "You already borrowed this book." });
    }

    book.borrowers.push(userId);
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyBooks = async (req, res) => {
  try {
    const myBooks = await Book.find({ borrowers: req.userId });
    res.json(myBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeBorrowedBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found." });

    book.borrowers = book.borrowers.filter((borrower) => borrower.toString() !== req.userId);
    await book.save();
    res.json({ message: "Book removed from your shelf." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
