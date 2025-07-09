import express from 'express';
import { CreateBlogs } from '../controllers/blogController.js/createBlog.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload from '../helper/multerHelper.js';
import { getBlogById } from '../controllers/blogController.js/getBlogById.js';

const blogRouter= express.Router();


blogRouter
  .route("/createBlog")
  .post(authMiddleware, upload.single("image"), CreateBlogs);

blogRouter
    .route("/getAllBlogs")
    .get(authMiddleware, isAdmin, getAll);

blogRouter
  .route("/getBlog/:id")
  .get(authMiddleware, getBlogById);

  blogRouter.route("/deleteBlog/:id").get(authMiddleware, d);

export default blogRouter;
