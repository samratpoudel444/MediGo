import express from 'express';
import { CreateBlogs } from '../controllers/blogController.js/createBlog';
const blogRouter= express.Router();


blogRouter.route("/createBlog").post(upload.single("BlogPic"),);

export default blogRouter;
