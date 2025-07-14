import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "./blogCard";
import Navbar from "../Navbar";
import axiosInstance from "../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

const fetchBlogs = async () => {
  const response = await axiosInstance.get("/api/v1/getAllBlogsToDisplay");
  return response.data.message;
};

const BlogListPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchBlogs"],
    queryFn: fetchBlogs,
  });

  if (isLoading)
    return (
      <div className="text-center mt-10 text-lg font-medium">
        Loading blogs...
      </div>
    );

  if (error)
    return (
      <div className="text-center mt-10 text-red-600">Error loading blogs.</div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="p-6 md:p-12">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
          Latest Blogs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data &&
            data.map((blog) => (
              <Link key={blog._id} to={`/blog/${blog._id}`}>
                <BlogCard
                  author={blog.Author}
                  content={blog.content}
                  picture={blog.picture}
                  title={blog.title}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
