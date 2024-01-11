var path = require('path');
const multer = require('multer');

// Multer setup
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload images only.'), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = '-' + Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

module.exports = upload;
