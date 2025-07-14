import BlogCard from "./blogCard";
import Navbar from "../Navbar";
import axiosInstance from "../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Footer from "../Footer";

const fetchBlogs= async()=>
{
  try{
    const response = await axiosInstance.get("/api/v1/getAllBlogsToDisplay");
    console.log("the resp is", response)
    return response.data.message;
  }
  catch(err)
  {
    console.log(err);
    throw err;
  }
  
}


const BlogListPage = () => {
  const {data}= useQuery({
    queryKey:['fetchBlogs'],
    queryFn:fetchBlogs
  })
  console.log("the dta ",data)

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex-grow">
      { data && data.map((arr, index)=>
      (
        <BlogCard author={arr.author}  content= {arr.content} picture={arr.picture} title={arr.title} />
      )) }

      </div>
      <Footer className="mx-15"/>

    </div>
  );
};

export default BlogListPage;
