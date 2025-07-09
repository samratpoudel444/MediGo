import express from 'express';
import { CreateBlogs } from '../controllers/blogController.js/createBlog.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload from '../helper/multerHelper.js';
import getAllBlogs from '../controllers/blogController.js/getAllBlogs.js';
import getBlogById from '../controllers/blogController.js/getBlogById.js';
const blogRouter= express.Router();


blogRouter
  .route("/createBlog")
  .post(authMiddleware, upload.single("image"), CreateBlogs);

blogRouter
    .route("/getAllBlogs")
    .get(authMiddleware, isAdmin, getAllBlogs);

blogRouter
  .route("/getBlog/:id")
  .get(authMiddleware, getBlogById);
  blogRouter.route("/getBlog/:id").get(authMiddleware, getBlogById);

export default blogRouter;
