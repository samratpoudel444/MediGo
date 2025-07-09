import fs from "fs";
import path from "path";
import cloudinary from "../../helper/cloudinaryHelper.js";
import blogTable from "../../db/models/blogModel.js";



export const CreateBlogs = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const filePath = path.resolve(`uploads/${req.file.filename}`);
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "blogs",
    });


    fs.unlinkSync(filePath);

    
    const blog = await blogTable.create({
      title,
      content,
      author,
      picture: result.secure_url,
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.error("Error uploading blog:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
