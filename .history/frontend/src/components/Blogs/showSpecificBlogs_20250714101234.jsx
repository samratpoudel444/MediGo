import { useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

const ShowSpecificBlogs = () => {
    const value= useParams();
   const id = value.id;
    const FetchData= async()=>
    {
        try{
            const response = await axiosInstance.get(`/api/v1/getBlog/${id}`);
            return response.data.message;
        }
        catch(err)
        {
            console.log(err)
            throw err;
        }
    }

    const {data}= useQuery({
        queryKey:['Test'],
        que

    })

  return (
    <div>
        <div><img src={picture} alt="" /></div>
        <div>{title}</div>
        <div><p>{content}</p>
        </div>
        <div><p>{author}</p></div>

    </div>
  );
};

export default ShowSpecificBlogs;