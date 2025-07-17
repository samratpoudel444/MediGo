import { useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
//getPrescriptionById/:id

const fetchData= async()=>
{
    try{    
        const response = await axiosInstance.get(
          "/api/v1/getPrescriptionById/"
        );
    }
    catch(err)
    {
        console.log(err)
        throw err;
    }
}
const ViewPrescription = () => {
  const value = useParams();
  console.log(value.Age); 

  return <div>k xa</div>;
};

export default ViewPrescription;
