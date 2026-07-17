const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const auth = require("../middleware/auth");
const { register, login, getCurrentUser, updateProfile, resetPassword } = require("../controllers/userController");

const upload = multer({ dest: path.join(__dirname, '../uploads') });

router.post("/register", upload.single('photoFile'), register);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.get("/me", auth, getCurrentUser);
router.put("/me", auth, upload.single('photoFile'), updateProfile);

module.exports = router;