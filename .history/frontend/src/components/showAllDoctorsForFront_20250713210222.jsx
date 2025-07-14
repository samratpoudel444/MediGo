import { useQueries, useQuery } from "@tanstack/react-query";
import Footer from "./Footer"
import Navbar from "./Navbar"
import axiosInstance from "./utils/AxiosInstance";
import image from"../assets/MediGO.png"

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
        <div>
          {data.map((arr, index) => (
            <div className="h-20 w-10 border mx-10 my-10">
              <img src={arr?.image || image} alt="" />
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
}

export default ShowAllDoctorDisplay;