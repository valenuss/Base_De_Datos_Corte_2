const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/images/users/avatar",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

module.exports = storage;
