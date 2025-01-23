const bcrypt = require("bcrypt");
const User = require("../models/User");
const moment = require("moment");
const cloudinary = require("../utils/cloudinary");

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Password validation (minimum 8 characters, 1 capital letter, 1 lowercase, 1 special character)
function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
}

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password, companyName, age, dob } = req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !companyName ||
      !age ||
      !dob ||
      !req.file
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required, including an image." });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password format
    if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, and one special character",
      });
    }

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      companyName,
      age,
      dob,
      imageUrl: req.file.path, // Cloudinary URL from multer (uploaded image)
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiration = moment().add(10, "minutes").toDate(); // OTP valid for 10 minutes

    // Save OTP and expiration in the database
    user.otp = otp;
    user.otpExpiration = otpExpiration;
    await user.save();

    res.status(200).json({
      message: "OTP sent for verification.",
      otp,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const otpVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate required fields
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not Found." });
    }

    // Validate OTP
    if (user.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP." });
    }

    // Check if OTP is expired
    const currentTime = new Date();
    if (currentTime > user.otpExpiration) {
      return res.status(401).json({ message: "OTP has expired." });
    }

    // Respond with success message and user details
    res.status(200).json({
      message: "OTP verified successfully.",
      user: {
        name: user.name,
        email: user.email,
        companyName: user.companyName,
        age: user.age,
        dob: user.dob,
        imageUrl: user.imageUrl,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate required field
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required to delete the account." });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Remove the image from Cloudinary
    if (user.imageUrl) {
      const publicId = user.imageUrl
        .split("/image/upload/")[1] // Extract part after '/image/upload/'
        .replace(/^v\d+\//, "") // Remove version identifier (e.g., 'v1737515568/')
        .replace(/\.[^/.]+$/, ""); // Remove the file extension
      await cloudinary.uploader.destroy(publicId);
    }

    // Delete the user
    await User.deleteOne({ email });

    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { registerUser, loginUser, otpVerification, deleteUser };
