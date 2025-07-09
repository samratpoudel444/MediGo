import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  picture: {
    type: String,
    trim: true,
    required: true,
  },
  author: {
    type: String,
    trim: true,
    required: true,
  },
});

const blogTable= mongoose.model('blog', blogSchema)

export default blogTable;