const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, photo, bio } = req.body;
    const photoFile = req.file;
    const photoUrl = photoFile ? `/uploads/${photoFile.filename}` : photo;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: passwordHash,
      photo: photoUrl,
      bio,
      joinedDate: new Date(),
    });

    await user.save();

    const token = createToken(user);
    res.status(201).json({ user: user.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }), token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = createToken(user);
    res.json({ user: user.toObject({ versionKey: false, transform: (doc, ret) => { delete ret.password; return ret; } }), token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "If an account with that email exists, your password has been updated." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password reset successfully. Please log in with your new password." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const { name, photo, bio, email, password } = req.body;
    const photoFile = req.file;
    const photoUrl = photoFile ? `/uploads/${photoFile.filename}` : photo;

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "This email is already in use." });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (photoUrl) user.photo = photoUrl;
    if (bio) user.bio = bio;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.__v;
    
    res.json({ user: userObj });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

