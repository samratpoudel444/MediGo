import { useParams } from "react-router-dom";

const ViewPrescription = () => {
  const value = useParams();
  console.log(value.age); 

  return <div>k xa</div>;
};

export default ViewPrescription;
