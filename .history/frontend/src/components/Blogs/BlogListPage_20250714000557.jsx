import BlogCard from "./blogCard";
import ChatButton from "../ChatApp/ChatButton";
import Navbar from "../Navbar";
import axiosInstance from "../utils/AxiosInstance";

const fetchBlogs= async()=>
{
  try{
    const response = await axiosInstance.get("/api/v1/getAllBlogsToDisplay");
    return response.data.message;
  }
  catch(err)
  {
    console.log(err);
    throw err;
  }
  
}


const BlogListPage = () => {
  const {data}

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
