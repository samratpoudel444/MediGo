import { useParams } from "react-router-dom";
//getPrescriptionById/:id

const fetchData= async()=>
{
    try{

    }
    catch(err)
    {
        
    }
}
const ViewPrescription = () => {
  const value = useParams();
  console.log(value.Age); 

  return <div>k xa</div>;
};

export default ViewPrescription;
