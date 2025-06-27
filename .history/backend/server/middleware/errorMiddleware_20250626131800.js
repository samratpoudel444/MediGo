import multer from "multer";

export const errorHandler = (err, req, res, next) => {

  console.log(err)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }


  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res
      .status(400)
      .json({ message: "Unexpected field in file upload." });
  }


  let statusCode = 500;


  if (err.code === "ENOENT") {
    statusCode = 400; 
  }

  return res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    code: err.code,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
