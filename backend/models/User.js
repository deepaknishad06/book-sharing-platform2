const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String, default: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=320&q=80" },
  bio: { type: String, default: "A book lover who enjoys sharing stories." },
  joinedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
