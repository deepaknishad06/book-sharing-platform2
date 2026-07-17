const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  borrowBook,
  getMyBooks,
  removeBorrowedBook,
} = require("../controllers/bookcontroller");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || "";
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.post(
  "/books",
  upload.fields([
    { name: "coverFile", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  addBook,
);
router.put(
  "/books/:id",
  upload.fields([
    { name: "coverFile", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  updateBook,
);
router.post("/books/:id/borrow", auth, borrowBook);
router.get("/mybooks", auth, getMyBooks);
router.delete("/mybooks/:id", auth, removeBorrowedBook);

module.exports = router;
