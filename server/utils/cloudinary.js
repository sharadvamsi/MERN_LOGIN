const cloudinary = require("cloudinary").v2;

cloudinary.config({
    url: process.env.CLOUDINARY_URL, // Use the URL directly
  });

module.exports = cloudinary;
