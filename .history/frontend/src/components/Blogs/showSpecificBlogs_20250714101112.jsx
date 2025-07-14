import { useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";

const ShowSpecificBlogs = () => {
    const data= useParams();
   const id= data.id;
    const FetchData= async()=>
    {
        try{
            const response = await axiosInstance.get(`/api/v1/getBlog/${id}`);
            return response.data.message;
        }
        catch(err)
        {
            cons
        }
    }

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