import express from 'express';
const blogRouter= express.Router();

blogRouter.route("/createBlog").post();

export default blogRouter;
