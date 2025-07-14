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


  if (isError)
    return (
      <div className="text-center mt-10 text-red-500">
        Something went wrong...
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="mt-16 text-center text-4xl font-bold text-blue-600">
        {data?.title}
      </div>

      <div className="w-full flex justify-center mt-8 h-140">
        <img
          className="w-1/2 h-full rounded-lg shadow-md"
          src={data?.picture}
          alt="Blog"
        />
      </div>

      <div className="mt-10 w-full flex justify-end mr-20">
        <div className="max-w-3xl space-y-4 text-justify">
          {data?.content?.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-end px-6 md:px-20 mt-10">
        <p className="font-semibold text-xl text-gray-700">
          Author: {data?.author}
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default ShowSpecificBlogs;
