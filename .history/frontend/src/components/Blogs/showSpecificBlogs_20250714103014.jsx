import { useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../Navbar";
import Footer from "../Footer";


const ShowSpecificBlogs = () => {
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/getBlog/${id}`);
      return response.data.message; 
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong...</div>;

  return (
    <div>
      <Navbar />
      <div className="mt-16 text-center text-4xl font-bold text-blue-600">
        {data?.title}
      </div>
      <div className="w-full h-90  flex justify-cente r">
        <img className="w-auto h-auto" src={data?.picture} alt="Blog" />
      </div>

      <div className="mt-10 w-full flex justify-center items-center">
        <div className="max-w-2xl">
          {data?.content?.split("\n").map((line, index) => (
            <p key={index} className="text-justify">
              {line}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full">
        <p className="text-right mr-50 font-bold text-3xl">{"Author: " + data?.author}</p>
      </div>
      <Footer/>
    </div>
  );
};

export default ShowSpecificBlogs;
