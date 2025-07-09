import express from 'express';
import { CreateBlogs } from '../controllers/blogController.js/createBlog.js';
const blogRouter= express.Router();


blogRouter.route("/createBlog").post(upload.single("BlogPic"),createBlogs);

export default blogRouter;
