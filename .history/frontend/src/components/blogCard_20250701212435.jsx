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
          <div className="border w-2/3 flex flex-col p">
            <h1 className="text-center"> Title</h1>
            <p>
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.sefiywiuy3rworywio7ru adgsduwuyr wnd wrwgrw
              djgwqjfgdjw
              fdwfjghwfj
            </p>
          </div>
        </div>
      </div>
    );
}

export default BlogCard;