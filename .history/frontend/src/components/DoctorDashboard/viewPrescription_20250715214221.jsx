import { useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
//getPrescriptionById/:id


const ViewPrescription = () => {

  const value = useParams();
  console.log(value.Age); 

  return <div>k xa</div>;
};

export default ViewPrescription;
