import { useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../Navbar";


const ShowSpecificBlogs = () => {
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/getBlog/${id}`);
      return response.data.message; // ensure this is correct
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id], // more specific queryKey
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
      <div className="w-full h-90  flex justify-center">
        <img className="w-auto h-auto" src={data?.picture} alt="Blog" />
      </div>

      <div className="mt-10 w-full flex justify-center items-center">
        <div className="max-w-2xl space-y-4">
          {data?.content?.split("\n").map((line, index) => (
            <p key={index} className="text-justify">
              {line}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full">
        <p className="text-right mr-50">{"Author: " + data?.author}</p>
      </div>
    </div>
  );
};

export default ShowSpecificBlogs;
