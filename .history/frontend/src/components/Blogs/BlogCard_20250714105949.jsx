import image from "../../assets/MEDIGO.png";


const BlogCard= ({author,  content, picture, title,})=>
{
    return (

      <div className="flex flex-col justify-center items-center">
        <div className=" flex flex-row mt-10 bg-gray-50 w-[95%] h-40 shadow-sm hover:w-0.68 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointe">
          <div className=" px-5 py-4 w-50">
            <img src={picture? ||} alt="" />
          </div>
          <div className=" w-2/3 flex flex-col py-5 gap-3 px-5">
            <h1 className="text-center font-bold text-2xl"> {title}</h1>
            <p className="truncate">
             {content}
            </p>
            <a className="text-right">Author : {author}</a>
          </div>
        </div>
      </div>

    );
}

export default BlogCard;