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

    if(!data)
    {
        return(
            <div>
              <Navbar/>
              <div>
                No Doctor Avilable currently
              </div>
            </div>
        )
    }

    return (
      <div>
        <Navbar />
        <div className="flex justify-center gap-10">
          {data.map((arr, index) => (
            <div className="h-50 w-50 mx-10 my-10 rounded-2xl border hover:h-52 hover:w-52">
              <img
                className="px-2 py-2 rounded-2xl"
                src={arr?.image || image}
                alt=""
              />
            </div>
          ))}
        </div>
        <Footer className="fixed bottom-0 w-full" />
      </div>
    );
}

export default ShowAllDoctorDisplay;