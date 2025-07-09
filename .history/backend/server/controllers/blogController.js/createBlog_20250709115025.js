import blogTable from "../../db/models/blogModel.js";
import cloudinary from "../../helper/cloudinaryHelper.js";

export const CreateBlogs = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload to Cloudinary using a Promise
    const imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "blogs",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(new Error("Cloudinary upload failed"));
          } else {
            resolve(result.secure_url);
          }
        }
      );

      stream.end(req.file.buffer);
    });

    // Save to DB
    const newBlog = await blogTable.create({
      title,
      content,
      author,
      image: imageUrl,
    });

    return res.status(201).json({
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (err) {
    console.error(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal Server Error",
    });
  }
};
