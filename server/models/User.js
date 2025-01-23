const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String },
  age: { type: Number },
  dob: { type: String },
  imageUrl: { type: String, required: true }, // Cloudinary image URL
  otp: { type: String }, // OTP for verification
  otpExpiration: { type: Date }, // OTP expiration time
});

module.exports = mongoose.model("User", userSchema);
