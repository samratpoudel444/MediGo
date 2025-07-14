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
      <div className="mt-16 text-center text-4xl font-bold">{data?.title}</div>
      <div className="w-full h-80 border flex justify-center">
        <img className="w-80 h-80" src={data?.picture} alt="Blog" />
      </div>

      <div className="mt-10 w-full flex justify-center border">
        <p>{data?.content}</p>
      </div>
      <div>
        <p>{"Authot"+data?.author}</p>
      </div>
    </div>
  );
};

export default ShowSpecificBlogs;
