import {  useQuery } from "@tanstack/react-query";
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
        console.log("the resp is", response.data.doctors);
        return response.data.doctors;
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

const ShowAllDoctorDisplay= ()=>
{
    const { data, isLoading, isError } = useQuery({
      queryFn: getAllDoctors,
      queryKey: ["displayForDoctor"],
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong.</div>;

    console.log("The data is",data)

    return (
      <div>
        <Navbar />
        <div className="flex">
          {data.map((arr, index) => (
       
              <div className="h-50 w-50 mx-10 my-10 rounded-2xl">
                <img className= "px-"src={arr?.image || image} alt="" />
              </div>
           
          ))}
        </div>
        <Footer />
      </div>
    );
}

export default ShowAllDoctorDisplay;