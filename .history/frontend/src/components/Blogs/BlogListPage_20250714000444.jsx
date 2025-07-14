import BlogCard from "./blogCard";
import ChatButton from "../ChatApp/ChatButton";
import Navbar from "../Navbar";
import axiosInstance from "../utils/AxiosInstance";

const fetchBlogs= async()=>
{
  try{}
  
}


const BlogListPage = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <BlogCard />
        <BlogCard />
        <ChatButton />
      </div>
    </div>
  );
};

export default BlogListPage;
