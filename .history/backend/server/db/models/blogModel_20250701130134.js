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
  authorName: {
    type: String,
    trim: true,
    required: true,
  },
});

const blogTable= mongoose.model('blog', blogSchema)