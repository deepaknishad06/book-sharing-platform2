const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const connectDB = require("./config/db");
const Book = require("./models/Book");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
let dbConnected = false;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "https://book-sharing-platform-24ck9fry9-deep2706.vercel.app",
  "https://book-sharing-platform-1.onrender.com",
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/.*\.vercel\.app$/i.test(origin)
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(204);
  }
  next();
});
app.use(express.json());

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

app.get("/uploads/:filename", (req, res, next) => {
  const filePath = path.join(uploadPath, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return next();
  }

  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".pdf") {
    res.type("application/pdf");
    return res.sendFile(filePath);
  }

  const fileDescriptor = fs.openSync(filePath, "r");
  const header = Buffer.alloc(4);
  fs.readSync(fileDescriptor, header, 0, 4, 0);
  fs.closeSync(fileDescriptor);

  if (header.toString() === "%PDF") {
    res.type("application/pdf");
    return res.sendFile(filePath);
  }

  return next();
});

app.use("/uploads", express.static(uploadPath));

const seedBooks = async () => {
  const seedData = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      genre: "Literary Fiction",
      summary:
        "A thoughtful story about choices, regret, and the books that shape our lives.",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      genre: "Philosophical Fiction",
      summary:
        "A young shepherd travels across the desert and discovers the meaning of following his dreams.",
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic Fiction",
      summary:
        "A portrait of the Jazz Age and the American dream through love, loss, and ambition.",
    },
    {
      title: "Quiet: The Power of Introverts",
      author: "Susan Cain",
      genre: "Self-help",
      summary: "How introverts can thrive in a world that can't stop talking.",
    },
    {
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      genre: "History",
      summary:
        "A sweeping exploration of human history, culture, and the ideas that have shaped our species.",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-help",
      summary:
        "An easy and proven way to build good habits and break bad ones.",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Classic Fiction",
      summary:
        "A gripping tale of racial injustice and childhood innocence in the American South.",
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian Fiction",
      summary:
        "A dystopian social science fiction novel about totalitarian control and surveillance.",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Romance",
      summary:
        "A romantic novel about manners, upbringing, morality, education, and marriage.",
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      genre: "Fantasy",
      summary:
        "The first book in the Harry Potter series, following a young wizard's adventures.",
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      genre: "Finance",
      summary:
        "A personal finance book that contrasts the mindsets of the rich and poor.",
    },
    {
      title: "The Power of Habit",
      author: "Charles Duhigg",
      genre: "Self-help",
      summary:
        "Why we do what we do in life and business, and how to change it.",
      pdfUrl: "/pdfs/Power-of-Habit-Chapter-One.pdf",
    },
    {
      title: "Ikigai",
      author: "Héctor García and Francesc Miralles",
      genre: "Self-help",
      summary: "The Japanese secret to a long and happy life.",
      pdfUrl: "/pdfs/ikagi-book.pdf",
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      genre: "Finance",
      summary: "Timeless lessons on wealth, greed, and happiness.",
    },
    {
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      genre: "Self-help",
      summary:
        "A personal development and self-help book about achieving financial independence.",
    },
  ];

  for (const seedBook of seedData) {
    const existingBook = await Book.findOne({ title: seedBook.title });
    if (existingBook) {
      let updated = false;
      if (seedBook.pdfUrl && existingBook.pdfUrl !== seedBook.pdfUrl) {
        existingBook.pdfUrl = seedBook.pdfUrl;
        updated = true;
      }
      if (seedBook.summary && existingBook.summary !== seedBook.summary) {
        existingBook.summary = seedBook.summary;
        updated = true;
      }
      if (seedBook.genre && existingBook.genre !== seedBook.genre) {
        existingBook.genre = seedBook.genre;
        updated = true;
      }
      if (seedBook.author && existingBook.author !== seedBook.author) {
        existingBook.author = seedBook.author;
        updated = true;
      }
      if (seedBook.cover && existingBook.cover !== seedBook.cover) {
        existingBook.cover = seedBook.cover;
        updated = true;
      }
      if (updated) {
        await existingBook.save();
      }
    } else {
      await Book.create(seedBook);
    }
  }

  console.log("Seeded initial book collection.");
};
const startServer = async () => {
  try {
    await connectDB();
    dbConnected = true;
    console.log("✅ BINGO! MongoDB Atlas Connected Successfully!");
    await seedBooks();
  } catch (err) {
    console.log(
      "⚠️ MongoDB unavailable; starting server without database access.",
    );
    console.error(err.message);
  }

  app.use((req, res, next) => {
    if (
      req.path.startsWith("/api") &&
      !dbConnected &&
      req.method !== "OPTIONS"
    ) {
      return res.status(503).json({
        message:
          "Database unavailable. Please configure a reachable MongoDB connection.",
      });
    }
    next();
  });

  app.use("/api/auth", userRoutes);
  app.use("/api", bookRoutes);

  app.get("/", (req, res) => {
    res.send({ message: "Book Sharing Platform API is running" });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();
