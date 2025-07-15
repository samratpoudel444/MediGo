import express from 'express';
import { CreateBlogs } from '../controllers/blogController.js/createBlog.js';
import { authMiddleware, isAdmin, isPatient } from '../middleware/authMiddleware.js';
import upload from '../helper/multerHelper.js';
import { getBlogById } from '../controllers/blogController.js/getBlogById.js';
import { getAllBlogs } from '../controllers/blogController.js/getAllBlogs.js';
import { deleteBlog } from '../controllers/blogController.js/deleteBlog.js';
import { getBlogsOfSpecificUser } from '../controllers/blogController.js/getBlogsOfSpecificUser.js';

const blogRouter= express.Router();

getBlogsOfSpecificUser

blogRouter
  .route("/createBlog")
  .post(authMiddleware, upload.single("image"), CreateBlogs);

blogRouter
    .route("/getAllBlogs")
    .get(authMiddleware, isAdmin, getAllBlogs);

    blogRouter.route("/getAllBlogsToDisplay").get(authMiddleware, isPatient, getAllBlogs);


blogRouter
  .route("/getBlog/:id")
  .get(authMiddleware, getBlogById);

  blogRouter.route("/deleteBlog/:id").delete(authMiddleware,deleteBlog );

export default blogRouter;
