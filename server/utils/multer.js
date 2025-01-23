const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_images", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Only allow JPG/PNG formats
  },
});

const upload = multer({ storage });

module.exports = upload;
