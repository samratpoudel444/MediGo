export const errorHandler = async (err, req, res, next) => {
  if (err) {
    return res
      .status(err.code)
      .json({ message: err.message || "Something Went Wrong" });
  }
};
