import express from 'express';
const blogRouter= express.Router();

blogRouter.route("/createBlog").post(upload.single("prescription"));

export default blogRouter;
