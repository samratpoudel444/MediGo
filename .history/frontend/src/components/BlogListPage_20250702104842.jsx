import BlogCard from "./blogCard"
import ChatButton from "./ChatApp/ChatButton";
import Navbar from "./Navbar";
ChatButton


const BlogListPage= ()=>
{
    return (
      <div>
        <div><Navbar/></div>
        <div>
          <BlogCard />
          <BlogCard />
          
        </div>
      </div>
    );
}

export default BlogListPage;