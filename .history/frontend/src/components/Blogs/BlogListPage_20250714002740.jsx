import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axiosInstance from "../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import ShowSpecificBlogs from "./showSpecificBlogs";

const fetchBlogs = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/getAllBlogsToDisplay");
    console.log("the resp is", response);
    return response.data.message;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const BlogListPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["fetchBlogs"],
    queryFn: fetchBlogs,
  });

  const [showBlogs, setShowBlogs] = useState(false);

  const handleShowBlogs = () => {
    setShowBlogs(true);
  };

  return (
    <div>
      <Navbar />

      <div className="p-4">
        <button
          onClick={handleShowBlogs}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Show Blogs
        </button>
      </div>

      <div className="flex-grow p-4">
        {isLoading && <p>Loading blogs...</p>}
        {error && <p>Error loading blogs.</p>}

        {showBlogs && <ShowSpecificBlogs blogs={data} />}
      </div>

      <Footer />
    </div>
  );
};

export default BlogListPage;
