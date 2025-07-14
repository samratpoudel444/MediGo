import { useParams } from "react-router-dom";

const ShowSpecificBlogs = () => {
    const id= useParams
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