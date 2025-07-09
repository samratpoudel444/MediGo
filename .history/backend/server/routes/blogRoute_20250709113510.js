import express from 'express';
const blogRouter= express.Router();

blogRouter.route("/createBlog").post(upload.single("BlogPic"), );

export default blogRouter;
