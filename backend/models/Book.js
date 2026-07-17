const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  summary: { type: String, default: "A great book from the community." },
  genre: { type: String, default: "Literature" },
  cover: { type: String, default: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80" },
  borrowers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
  pdfUrl: { type: String, default: '' },
});

module.exports = mongoose.model("Book", bookSchema);