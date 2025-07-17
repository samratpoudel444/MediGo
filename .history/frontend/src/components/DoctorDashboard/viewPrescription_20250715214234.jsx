import { useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";
//getPrescriptionById/:id


const ViewPrescription = () => {
     const value = useParams();
     console.log(value); 
const fetchData = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/getPrescriptionById/${id}`
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};
 

  return <div>k xa</div>;
};

export default ViewPrescription;
