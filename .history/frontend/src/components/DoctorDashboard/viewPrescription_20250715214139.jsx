import { useParams } from "react-router-dom";
//getPrescriptionById/:id

const fetchData= async()=>
{
    try{    
        const response= await ax
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
