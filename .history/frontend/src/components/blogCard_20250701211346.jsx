import image from "../assets/MEDIGO.png";

const BlogCard= ()=>
{
    return(
        
            <div className="mt-10 m-50 border w-2/3 h-40 shadow-sm hover:h-41">
            <div className=" px-5 py-4 w-50">
                <img src={image} alt="" />
            </div>
            </div>
    
    )
}

export default BlogCard;