import { useParams } from "react-router-dom";

const ViewPrescription = () => {
  const value = useParams();
  console.log(value); // To see what comes from the URL

  return <div>k xa</div>;
};

export default ViewPrescription;
