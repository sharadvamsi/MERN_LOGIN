const express = require("express");
const { registerUser, loginUser, otpVerification, deleteUser } = require("../controllers/authController");
const upload = require("../utils/multer");

const router = express.Router();

// Registration route
router.post("/register", upload.single("image"), registerUser);
router.post("/login", loginUser); // login route
router.post("/verify-otp", otpVerification);// OTP verification route
router.post("/delete-account", deleteUser); // Account deletion route

module.exports = router;
