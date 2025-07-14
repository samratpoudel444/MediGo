import { useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

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
        <Navbar/>
      <div>{data?.title}</div>
      <div>
        <img src={data?.picture} alt="Blog" />
      </div>

      <div>
        <p>{data?.content}</p>
      </div>
      <div>
        <p>{data?.author}</p>
      </div>
    </div>
  );
};

export default ShowSpecificBlogs;
