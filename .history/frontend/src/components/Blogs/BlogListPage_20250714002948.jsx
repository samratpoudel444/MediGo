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

  if (isLoading) return <p>Loading blogs...</p>;
  if (error) return <p>Error loading blogs.</p>;

  return (
    <div>
      <Navbar />
      <div className="flex-grow p-8 grid flex grid-cols-1 md:grid-cols-3 gap-6">
        {data &&
          data.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`}>
              <BlogCard
                author={blog.author}
                content={blog.content}
                picture={blog.picture}
                title={blog.title}
              />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BlogListPage;
