export const CreateBlogs = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    const blogImage = req.file?.filename;

    if (!title || !content || !author || !blogImage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to DB example
    const blog = await BlogModel.create({
      title,
      content,
      author,
      image: blogImage,
    });

    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
