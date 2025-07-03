import image from "../assets/MEDIGO.png";

const BlogCard= ()=>
{
    return (
      <div className="flex flex-col justify-center items-center">
        <div className=" flex flex-row mt-10 bg-gray-100 w-[95%] h-40 shadow-sm hover:w-0.68">
            <div className="flex justify-center items-start font-bold text-2xl px-10 py-10">
                18 <br /> june
            </div>
          <div className=" px-5 py-4 w-50">
            <img src={image} alt="" />
          </div>
          <div>
            a
          </div>
        </div>
      </div>
    );
}

export default BlogCard;