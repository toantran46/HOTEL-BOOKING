const multer = require("multer");
const { cloudinary } = require("./cloudinary.config");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const dotenv = require("dotenv");
dotenv.config();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: process.env.CLOUD_FOLDER_UPLOAD
  },
})

const upload = multer({
  storage
});

module.exports = upload;
