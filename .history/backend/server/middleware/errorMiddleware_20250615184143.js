
import multer from 'multer'

export const errorHandler = (err, req, res, next) => {



  if (err instanceof multer.MulterError) {

    return res.status(400).json({ message: err.message });
  }
  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      message: "Unexpected field in file upload.",
    });
  }

  if (err.code && err.message) {
    return res.status(err.code).json({ message: err.message });
  }
};

