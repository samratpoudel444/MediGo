import { useParams } from "react-router-dom";

const ShowSpecificBlogs = () => {
    const data= useParams();
   const id= data.id;
    const FetchData= async()=>
    {
        try{

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