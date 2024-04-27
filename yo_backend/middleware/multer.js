const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    cb(null, path.join(__dirname, '..', '..', 'yo_frontend', 'public', 'image'));

  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Change filename if needed
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Modify file size limit if needed
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files format to upload");
  },
});

module.exports = upload.single("image"); // Export the single middleware directly
