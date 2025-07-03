import BlogCard from "./blogCard"
import Navbar from "./Navbar";
Chat


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