const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname.split(".")[0]);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
