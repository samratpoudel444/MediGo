import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueName + extension);
  },
});

const CheckIfFileIsImage = (req, file, cb) => {
    if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/gif"
  ) {
    
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};


const upload = multer({
  storage,
  fileFilter: CheckIfFileIsImage,
  limits: { fileSize: 5 * 1024 * 1024 },
});



export default upload;
