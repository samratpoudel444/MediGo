import { useQueries, useQuery } from "@tanstack/react-query";
import Footer from "./Footer"
import Navbar from "./Navbar"
import axiosInstance from "./utils/AxiosInstance";

const getAllDoctors= async()=>
{
    try{
        const response = await axiosInstance.get(
          "api/v1/getAllDoctorsForDisplay"
        );
        return response.data.message;
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

const ShowAllDoctorDisplay= ()=>
{
    const {data, isloading, isError}= useQuery({
        queryFn:getAllDoctors,
        queryKey:[displayDoctor]
    })
    
    return (
      <div>
        <Navbar />
        <div>{data.map((arr, index)=>)
           
        
        }</div>
        <Footer />
      </div>
    );
}

export default ShowAllDoctorDisplay;